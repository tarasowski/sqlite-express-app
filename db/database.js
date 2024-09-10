import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
    filename: './db/todos.db',
    driver: sqlite3.Database
});

export async function initializeDatabase() {
    const db = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL
      )
    `);
}


export async function readTodos() {
    const db = await dbPromise;
    return db.all('SELECT * FROM todos');
}

export async function writeTodos(text) {
    const db = await dbPromise;
    await db.run('INSERT INTO todos (text) VALUES (?)', text);
}

export async function deleteAll() {
    const db = await dbPromise;
    await db.run('DELETE FROM todos');
}