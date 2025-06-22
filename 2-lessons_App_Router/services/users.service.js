import fs from 'fs/promises';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../database.json');

/**
 * Reads the database from the JSON file.
 * @returns {Promise<any>}
 */
async function readDb() {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
}

/**
 * Writes the database to the JSON file.
 * @param db
 * @returns {Promise<void>}
 */
async function writeDb(db) {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

/**
 * User service for managing users in a JSON database.
 */
export default {
    async getAll() {
        return await readDb();
    },
    async getById(id) {
        const db = await readDb();
        return db.find(u => String(u.id) === String(id));
    },
    async create(data) {
        const db = await readDb();
        const id = db.length ? Math.max(...db.map(u => u.id)) + 1 : 1;
        const user = { id, ...data };
        db.push(user);
        await writeDb(db);
        return user;
    },
    async update(id, data) {
        const db = await readDb();
        const i = db.findIndex(u => String(u.id) === String(id));
        if (i === -1) return null;
        db[i] = { ...db[i], ...data };
        await writeDb(db);
        return db[i];
    },
    async remove(id) {
        const db = await readDb();
        const i = db.findIndex(u => String(u.id) === String(id));
        if (i === -1) return false;
        db.splice(i, 1);
        await writeDb(db);
        return true;
    }
};
