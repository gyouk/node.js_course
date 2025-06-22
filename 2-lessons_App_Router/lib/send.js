/**
 * This file is part of the App Router example.
 * It is used to send JSON responses and error messages.
 * @param res
 * @param data
 * @param status
 */
export function sendJson(res,data, status = 200) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

/**
 * Sends an error response in JSON format.
 * @param res
 * @param error
 * @param status
 */
export function sendError(res, error, status = 400) {
    sendJson(res, { error: error.message || error }, status);
}
