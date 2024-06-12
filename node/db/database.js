const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Para um banco de dados em memória

db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
});

module.exports = db;
