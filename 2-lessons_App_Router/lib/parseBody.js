/**
 * Parses the URL from the request object and returns the method and pathname.
 * @param req
 * @returns {Promise<unknown>}
 */
export function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            if (!body) return resolve(undefined);

            try {
                resolve(JSON.parse(body));            }
            catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
        });
}
