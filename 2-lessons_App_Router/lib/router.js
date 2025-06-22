import { parseUrl } from './parseUrl.js';
import { resolveRoute } from './resolveRoute.js';
import { parseBody } from './parseBody.js';
import { sendError} from './send.js';
import { pathToFileURL } from 'url';

/**
 * Handles incoming HTTP requests by parsing the URL, resolving the route,
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function handleRequest(req, res) {
    try {
        const url = parseUrl(req);
        const {  pathname } = url;

        const segments = pathname.split('/').filter(Boolean);
        const { file, params } = await resolveRoute(segments);

        if (!file) {
            sendError(res, 'Not Found', 404);
            return;
        }
        const fileUrl = pathToFileURL(file).href; // windows compatibility fix bug .
        const routeModule = await import(fileUrl);
        const handler = routeModule.default[req.method];

        if (typeof handler !== 'function') {
            sendError(res, 'Method Not Allowed', 405);
            return;
        }
        const body = await parseBody(req);
        await handler(req, res, { ...params,body });
    } catch (error) {
        sendError(res, error.message || 'Internal Server Error', 500);
    }
}


