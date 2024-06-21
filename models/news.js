const db = require('../db/database');

class News {
    static getNews(callback) {
        db.all("SELECT * FROM news", [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        }); 
    }

    static fetchNewsById(id, callback) {
        db.get("SELECT * FROM news WHERE id = ?", [id], (err, row) => {
            callback(err, row);
        }); 
    }
}

module.exports = News;
