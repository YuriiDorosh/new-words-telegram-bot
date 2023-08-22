const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor() {
        // this.db = new sqlite3.Database('./words.db', (err) => {
        this.db = new sqlite3.Database('./usr/src/app/data/words.db', (err) => {
            if (err) {
                console.error('Error connecting to the database: ', err);
            } else {
                console.log('Connected to the SQLite database.');
                this.init();
            }
        });
    }

    init() {
        this.db.run(`CREATE TABLE IF NOT EXISTS words (user_id TEXT, word TEXT, translation TEXT)`);
    }

    addWord(user_id, word, translation) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO words (user_id, word, translation) VALUES (?, ?, ?)`, [user_id, word, translation], (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }

    getWords(user_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT word, translation FROM words WHERE user_id = ?`, [user_id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    deleteWord(user_id, word) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM words WHERE user_id = ? AND word = ?`, [user_id, word], (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }

    deleteAllWords(user_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM words WHERE user_id = ?`, [user_id], (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }

    getRandomWord(user_id) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT word, translation FROM words WHERE user_id = ? ORDER BY RANDOM() LIMIT 1`, [user_id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
    
}

const dbInstance = new Database();

const initializeDatabase = () => {
};

module.exports = {
    db: dbInstance,
    initializeDatabase
};
