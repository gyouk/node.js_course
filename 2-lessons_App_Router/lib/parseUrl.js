/**
 * Parses the URL from the request object and returns the method and pathname.
 * @param req
 * @returns {{method, pathname: *}}
 */
export function  parseUrl(req) {
    const { url, method } = req;
    const { pathname } = new URL(url, `http://${req.headers.host}`);
    return { method, pathname };

}