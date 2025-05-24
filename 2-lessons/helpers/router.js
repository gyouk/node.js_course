const { getTasks, addTask, updateTask, deleteTask } = require('../layers/controller');

const routes = {};

function addRoute(method, path, handler) {
    const key = `${method.toUpperCase()} ${path}`;
    routes[key] = handler;
}

function handle(req, res) {
    const key = `${req.method} ${req.url}`;
    const handler = routes[key];

    if (handler) {
        handler(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
}

    addRoute('GET', '/tasks', getTasks);
addRoute('POST', '/tasks', addTask);
addRoute('PUT', '/tasks', updateTask);
addRoute('DELETE', '/tasks', deleteTask);

module.exports = { handle };
