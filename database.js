const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) return reject(err);
                resolve({ id: this.lastID });
            });
        });
    }
}

module.exports = Database;
