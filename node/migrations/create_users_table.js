const bcrypt = require('bcrypt');
const db = require('../db/database');

const saltRounds = 10;
const plainPassword = 'senha123';
const username = 'usuario1';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) {
        return console.error(err.message);
    }
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hash], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
});
