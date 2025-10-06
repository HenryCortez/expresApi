// seed.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./lab.db');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS users");
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT
  )`);

  const stmt = db.prepare("INSERT INTO users(username,password, email) VALUES(?,?,?)");
  stmt.run("admin", "secret123", "admin@example.com");
  stmt.run("alice", "alicepass", "alice@example.com");
  stmt.finalize();

  console.log("DB seeded -> lab.db (users: admin/secret123, alice/alicepass)");
});

db.close();
