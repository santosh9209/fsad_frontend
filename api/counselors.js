import { sql } from '@vercel/postgres';
import { counselors as mockCounselors } from '../src/services/mockData.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

    if (!process.env.POSTGRES_URL) {
        return res.status(200).json(mockCounselors);
    }

    try {
        const { rows } = await sql`SELECT * FROM counselors`;
        if (rows.length === 0) {
            return res.status(200).json(mockCounselors);
        }
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
