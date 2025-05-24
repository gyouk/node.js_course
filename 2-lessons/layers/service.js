const model = require('./model');

function getAll() {
    return model.read();
}

function add(data) {
    const all = model.read();
    const newItem = {
        id: Date.now(),
        title: data.title,
        completed: false,
        createdAt: new Date().toISOString()
    };
    all.push(newItem);
    model.write(all);
    return newItem;
}

function update(data) {
    const all = model.read();
    const index = all.findIndex(item => item.id === data.id);
    if (index === -1) return null;
    all[index] = { ...all[index], ...data };
    model.write(all);
    return all[index];
}

function remove(id) {
    const all = model.read();
    const filtered = all.filter(item => item.id !== id);
    if (filtered.length === all.length) return false;
    model.write(filtered);
    return true;
}

module.exports = { getAll, add, update, remove };
