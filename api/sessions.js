import { sql } from '@vercel/postgres';
import { mockSessions } from '../src/services/mockData.js';

export default async function handler(req, res) {
    if (!process.env.POSTGRES_URL) {
        // Fallback for Vercel demo without DB attached
        if (req.method === 'GET') {
            const { userId } = req.query;
            if (userId) return res.status(200).json(mockSessions.filter(s => s.userId == userId));
            return res.status(200).json(mockSessions);
        } else if (req.method === 'POST') {
            return res.status(200).json({ id: Date.now(), ...req.body, status: 'Upcoming' });
        }
    }

    try {
        if (req.method === 'GET') {
            const { userId } = req.query;
            if (userId) {
                const { rows } = await sql`SELECT * FROM sessions WHERE user_id = ${userId}`;
                return res.status(200).json(rows);
            } else {
                const { rows } = await sql`SELECT sessions.*, users.name as user_name FROM sessions LEFT JOIN users ON sessions.user_id = users.id`;
                return res.status(200).json(rows);
            }
        } else if (req.method === 'POST') {
            const { userId, counselor_name, date, time } = req.body;
            const { rows } = await sql`
                INSERT INTO sessions (user_id, counselor_name, date, time)
                VALUES (${userId}, ${counselor_name}, ${date}, ${time})
                RETURNING *;
            `;
            return res.status(201).json(rows[0]);
        }
        return res.status(405).json({ error: 'Method Not Allowed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
