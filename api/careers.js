import { sql } from '@vercel/postgres';
import { careers } from '../src/services/mockData';

export default async function handler(req, res) {
    if (!process.env.POSTGRES_URL) {
        // Fallback to mock data if Vercel Postgres is not added yet
        if (req.method === 'GET') {
            const { category, search } = req.query;
            let filtered = careers;
            if (category && category !== 'All') {
                filtered = filtered.filter(c => c.category === category);
            }
            if (search) {
                const q = search.toLowerCase();
                filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
            }
            return res.status(200).json(filtered);
        }
        return res.status(200).json([]);
    }

    try {
        if (req.method === 'GET') {
            const { category, search } = req.query;
            
            let query = `SELECT * FROM careers WHERE 1=1`;
            const values = [];
            
            if (category && category !== 'All') {
                values.push(category);
                query += ` AND category = $${values.length}`;
            }
            
            if (search) {
                values.push(`%${search}%`);
                query += ` AND (title ILIKE $${values.length} OR description ILIKE $${values.length})`;
            }

            const { rows } = await sql.query(query, values);
            return res.status(200).json(rows);
            
        } else if (req.method === 'POST') {
            const { title, category, description, salary, growth, requirements } = req.body;
            const { rows } = await sql`
                INSERT INTO careers (title, category, description, salary, growth, requirements)
                VALUES (${title}, ${category}, ${description}, ${salary}, ${growth}, ${requirements})
                RETURNING *;
            `;
            return res.status(201).json(rows[0]);
            
        } else if (req.method === 'DELETE') {
            const { id } = req.query;
            await sql`DELETE FROM careers WHERE id = ${id}`;
            return res.status(200).json({ message: 'Deleted successfully' });
        }
        
        return res.status(405).json({ error: 'Method Not Allowed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
