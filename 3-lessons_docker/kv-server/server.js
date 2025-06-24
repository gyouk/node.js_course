
import http from 'http';

const REDIS_URL = process.env.REDIS_URL || 'http://localhost:4000';

/**
 * Fetch data from the Redis-like server
 * @param path
 * @param options
 * @returns {Promise<unknown>}
 */
function fetchRedis(path, options = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, REDIS_URL);
        const opts = {
            method: options.method || 'GET',
            headers: options.headers || {},
        };

        const req = http.request(url, opts, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, json: () => Promise.resolve(JSON.parse(data)) }));
        });

        req.on('error', reject);

        if (options.body) req.write(options.body);
        req.end();
    });
}

/**
 * A simple key-value server that interacts with a Redis-like server.
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @type {Server<typeof IncomingMessage, typeof ServerResponse>}
 */
const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/kv/')) {
        const key = req.url.split('/').pop();
        const resp = await fetchRedis(`/get?key=${encodeURIComponent(key)}`);
        const data = await resp.json();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }
    else if (req.method === 'POST' && req.url === '/kv') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            const resp = await fetchRedis('/set', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            });
            const data = await resp.json();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => console.log('KV-server running on 3000'));
