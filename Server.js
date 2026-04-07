const express = require('express');
const cors = require('cors');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
app.use(cors());
app.use(express.json());

let db;

(async () =>{
    db = await open({filename: '.database.db', driver: sqlite3.Database});
    await db.exec("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");

})();

app.get('/tasks', async (req, res) =>{
    const tasks = await db.all ("SELECT * FROM tasks");
    res.json(tasks);
})();

app.post('/tasks', async (req, res) => {
    const { name } = req.body;
    await db.run("INSERT INTO tasks (name) VALUES (?)", [name]);
    res.sendStatus(201);
});

app.delete('/tasks/:id', async (req, res) => {
    await db.run("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Server draait op http://localhost:3000"));
