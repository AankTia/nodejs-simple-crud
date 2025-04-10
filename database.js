const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.resolve(_dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.err('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');

    // Create tasks table if doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message)
        } else {
            console.log('Tasks table ready.');
        }
    });
});

module.exports = db;
