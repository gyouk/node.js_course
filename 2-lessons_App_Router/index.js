import 'dotenv/config';
import http from'http';
import { handleRequest } from'./lib/router.js' ;

/**
 *  Port
 **/
const PORT = process.env.PORT ;

/**
 * HTTP Server
 * @type {Server<typeof IncomingMessage, typeof ServerResponse>}
 */
const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`); // eslint-disable-line no-console
});