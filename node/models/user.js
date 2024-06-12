const db = require('../db/database');

exports.findUser = (username, callback) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};
