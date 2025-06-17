import fs  from 'fs';
import  path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, '..', 'database.json');

/**
 * Read the database from the file
 * @returns {any}
 */
function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ habits: [] }, null, 2));
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
}

/**
 * Write the database to the file
 * @param db
 */
function writeDB(db) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export{ readDB, writeDB };
