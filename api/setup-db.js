import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // Only allow this route to be called if Postgres is configured
    if (!process.env.POSTGRES_URL) {
        return res.status(500).json({ error: "Postgres not configured. Please add Vercel Postgres storage to your project." });
    }

    try {
        // Create tables
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'student'
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS careers (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100),
                description TEXT,
                salary VARCHAR(100),
                growth VARCHAR(100),
                requirements TEXT
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS counselors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                specialties VARCHAR(255),
                rating NUMERIC,
                availability VARCHAR(255)
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS sessions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                counselor_name VARCHAR(255),
                date VARCHAR(50),
                time VARCHAR(50),
                status VARCHAR(50) DEFAULT 'Upcoming'
            );
        `;

        // Insert initial mock data if tables are empty
        const { rows: careerRows } = await sql`SELECT count(*) FROM careers`;
        if (parseInt(careerRows[0].count) === 0) {
            await sql`
                INSERT INTO careers (title, category, description, salary, growth, requirements)
                VALUES 
                ('Software Engineer', 'Technology', 'Design and build software', '$120k', '22%', 'CS Degree'),
                ('Data Scientist', 'Technology', 'Analyze data trends', '$115k', '35%', 'Math/Stats Degree')
            `;
        }

        return res.status(200).json({ message: "Database tables initialized successfully" });

    } catch (error) {
        console.error("DB Setup Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
