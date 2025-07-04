import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'http://localhost:4000';

app.use(express.json());

/**
 * Endpoint to get a value by key from the Redis-like server.
 */
app.get('/kv/:key', async (req, res) => {
    try {
        const key = encodeURIComponent(req.params.key);
        const response = await fetch(`${REDIS_URL}/get?key=${key}`);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to Redis' });
    }
});

/**
 * Endpoint to set a key-value pair in the Redis-like server.
 */
app.post('/kv', async (req, res) => {
    try {
        const response = await fetch(`${REDIS_URL}/set`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to Redis' });
    }
})


app.listen(PORT, () => {

    console.log(`KV-server running on http://localhost:${PORT}`);
});
