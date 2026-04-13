const express = require('express');
const cors = require('cors');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const http = require("http");
const { networkInterfaces } = require('os');
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) =>{
    console.log("Een client is connected");

    socket.on("disconnect", () =>{
        console.log("Een client is disconnected");
    });
});

let db;

app.get('/tasks', async (req, res) => {
    const tasks = await db.all("SELECT * FROM tasks");
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { name } = req.body;
    await db.run("INSERT INTO tasks (name) VALUES (?)", [name]);
    io.emit("TaskUpdate");
    res.sendStatus(201);
});

app.delete('/tasks/:id', async (req, res) => {
    await db.run("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    io.emit("TaskUpdate");
    res.sendStatus(200);
});

app.patch('/tasks/:id', async (req, res) => {
    const { completed } = req.body;
    await db.run("UPDATE tasks SET completed = ? WHERE id = ?"
        , [completed, req.params.id]);
    io.emit("TaskUpdate");
    res.sendStatus(200);
});

async function startServer() {
    db = await open({
        filename: path.join(__dirname, 'database.db'),
        driver: sqlite3.Database
    });

    await db.exec(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, completed INTEGER DEFAULT 0)"
    );

    server.listen(3000,'0.0.0.0', () => {
        console.log("Server draait op http://192.168.1.19:3000");
    });
}

startServer();