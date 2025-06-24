
import http from 'http';

const store = new Map();
/**
 * A simple in-memory key-value store that mimics Redis-like behavior.
 * @type {Server<typeof IncomingMessage, typeof ServerResponse>}
 */
const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/get')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const key = url.searchParams.get('key');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ value: store.get(key) ?? null }));
    }
    else if (req.method === 'POST' && req.url === '/set') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { key, value } = JSON.parse(body);
                store.set(key, value);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: true }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: false, error: error.message }));
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(4000, () => console.log('Redis-like running on 4000'));
