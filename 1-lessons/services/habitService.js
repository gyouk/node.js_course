import { readDB, writeDB } from '../models/habitModel.js';

function add(name, freq) {
    const db = readDB();
    const maxId = db.habits.length > 0 ? Math.max(...db.habits.map(h => Number(h.id))) : 0;
    const id = maxId + 1;
    db.habits.push({
        id,
        name,
        freq,
        records: []
    });
    writeDB(db);
    console.log(`Звичка "${name}" додана з id ${id}!`);
}

function list() {
    const db = readDB();
    if (!db.habits.length) return console.log('No habits');
    console.table(db.habits.map(({ id, name, freq, records }) => ({
        id, name, freq, count: records.length
    })));
}

function markDone(id) {
    const db = readDB();
    const habit = db.habits.find(h => h.id === id);
    if (!habit) return console.log('Habit not found');
    // врахування ENV зсуву дати
    const offset = parseInt(process.env.DAY_OFFSET || '0', 10);
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const today = date.toISOString().slice(0, 10);
    if (habit.records.includes(today)) {
        console.log('Already marked for today');
        return;
    }
    habit.records.push(today);
    writeDB(db);
    console.log('Marked as done!');
}

function getStats() {
    const db = readDB();
    const now = new Date();
    db.habits.forEach(h => {
        const days = h.freq === 'daily' ? 7 : (h.freq === 'weekly' ? 4 : 1);
        const fromDate = new Date();
        fromDate.setDate(now.getDate() - (h.freq === 'daily' ? 6 : h.freq === 'weekly' ? 27 : 29));
        const recent = h.records.filter(rec => new Date(rec) >= fromDate);
        const total = days;
        const percent = ((recent.length / total) * 100).toFixed(1);
        console.log(`${h.name} (${h.freq}): ${percent}% за останні ${h.freq === 'daily' ? 7 : 30} днів`);
    });
}

function remove(id) {
    const db = readDB();
    const i = db.habits.findIndex(h => h.id === id);
    if (i === -1) return console.log('Not found');
    db.habits.splice(i, 1);
    writeDB(db);
    console.log('Deleted');
}

function update(id, name, freq) {
    const db = readDB();
    const habit = db.habits.find(h => h.id === id);
    if (!habit) return console.log('Not found');
    if (name) habit.name = name;
    if (freq) habit.freq = freq;
    writeDB(db);
    console.log('Updated');
}

export{ add, list, markDone, getStats, remove, update };
