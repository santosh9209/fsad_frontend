const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Santosh@#$22',
            database: 'fsad_db'
        });

        const [rows, fields] = await connection.execute('SELECT * FROM users;');
        console.log("DB EXACT DUMP FROM USERS TABLE:");
        console.table(rows);
        await connection.end();
    } catch (e) {
        console.error("Error connected to db:", e);
    }
}
testConnection();
