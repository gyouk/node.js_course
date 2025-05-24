const http = require('http');
const { handle } = require('./helpers/router');

const PORT = 3000;

const server = http.createServer((req, res) => {
    handle(req, res);
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
