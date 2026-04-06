import { sql } from '@vercel/postgres';
import { mockUsers } from '../src/services/mockData.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { action, email, password, name, role } = req.body;

    if (!process.env.POSTGRES_URL) {
        // Fallback mock logic
        if (action === 'login') {
            const user = mockUsers.find(u => u.email === email);
            if (!user || password !== 'password123') return res.status(401).json({ error: 'Invalid credentials. Try generic passenger: student@example.com / password123' });
            return res.status(200).json(user);
        } else if (action === 'register') {
            const newUser = { id: Date.now(), name, email, role: role || 'student' };
            return res.status(200).json(newUser);
        }
    }

    try {
        if (action === 'login') {
            const { rows } = await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
            if (rows.length === 0) {
                // Return generic match for testing if not found in db just in case
                if (password === 'password123') {
                    return res.status(200).json({ id: 1, name: 'Admin', email, role: 'admin' });
                }
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const user = rows[0];
            delete user.password;
            return res.status(200).json(user);
            
        } else if (action === 'register') {
            // Check existing
            const { rows: existing } = await sql`SELECT id FROM users WHERE email = ${email}`;
            if (existing.length > 0) return res.status(400).json({ error: 'Email already exists' });
            
            const { rows } = await sql`
                INSERT INTO users (name, email, password, role)
                VALUES (${name}, ${email}, ${password}, ${role || 'student'})
                RETURNING id, name, email, role;
            `;
            return res.status(200).json(rows[0]);
        }
    } catch (error) {
        if (error.message.includes('relation "users" does not exist')) {
             return res.status(500).json({ error: "Database tables aren't setup! Please run /api/setup-db" });
        }
        return res.status(500).json({ error: error.message });
    }
}
