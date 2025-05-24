const service = require('./service');

function parseBody(req, callback) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => callback(JSON.parse(body)));
}

function getTasks(req, res) {
    const data = service.getAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function addTask(req, res) {
    parseBody(req, body => {
        const newTask = service.add(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
    });
}

function updateTask(req, res) {
    parseBody(req, body => {
        const updated = service.update(body);
        if (updated) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updated));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    });
}

function deleteTask(req, res) {
    parseBody(req, body => {
        const success = service.remove(body.id);
        if (success) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    });
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};
