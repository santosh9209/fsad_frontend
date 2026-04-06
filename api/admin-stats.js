import { sql } from '@vercel/postgres';
import { mockUsers, mockSessions, careers as mockCareers, counselors as mockCounselors } from '../src/services/mockData';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

    if (!process.env.POSTGRES_URL) {
        return res.status(200).json({
            totalUsers: mockUsers.length,
            totalSessions: mockSessions.length,
            totalCareers: mockCareers.length,
            activeCounselors: mockCounselors.length
        });
    }

    try {
        const [{ count: totalUsers }] = (await sql`SELECT count(*) FROM users`).rows;
        const [{ count: totalSessions }] = (await sql`SELECT count(*) FROM sessions`).rows;
        const [{ count: totalCareers }] = (await sql`SELECT count(*) FROM careers`).rows;
        const [{ count: activeCounselors }] = (await sql`SELECT count(*) FROM counselors`).rows;

        return res.status(200).json({
            totalUsers: parseInt(totalUsers),
            totalSessions: parseInt(totalSessions),
            totalCareers: parseInt(totalCareers),
            activeCounselors: parseInt(activeCounselors)
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
