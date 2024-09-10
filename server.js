import express from "express";
import { initializeDatabase, readTodos, writeTodos, deleteAll } from "./db/database.js";

const app = express();
const port = 3000;

// Initialize the database
initializeDatabase();

// Serve static files in the public folder
app.use(express.static("public"));

// Parse application/json bodies correctly
app.use(express.json());

// Read todos from the database
app.get("/todos", async (req, res) => {
    const todos = await readTodos();
    const onlyText = todos.map(todo => todo.text)
    console.log({ todos })
    res.json(onlyText);
});

// Write todos to the database
app.post("/todos", async (req, res) => {
    const text = req.body.todoText;
    await writeTodos(text);
    const todos = await readTodos();
    const onlyText = todos.map(todo => todo.text)
    res.json(onlyText);
});

app.delete("/todos", async (req, res) => {
    await deleteAll()
    const todos = await readTodos();
    const onlyText = todos.map(todo => todo.text)
    res.json(onlyText);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});