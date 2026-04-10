const express = require('express');
const cors = require('cors');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let db;

async function startServer() {
    db = await open({
        filename: path.join(__dirname, 'database.db'),
        driver: sqlite3.Database
    });

    await db.exec(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
    );

    app.listen(3000,'0.0.0.0', () => {
        console.log("Server draait op http://IP:3000");
    });
}

startServer();