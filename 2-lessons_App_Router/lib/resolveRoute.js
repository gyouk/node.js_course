import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Check if a file or directory exists at the given path.
 * @param p
 * @returns {Promise<boolean>}
 */

async function exists(p) {
    try {
        await fs.stat(p);
        return true;
    } catch {
        return false;
    }
}

/**
 * Resolves the route based on the URL segments and the routes directory.
 * @param segments
 * @param routesDir
 * @returns {Promise<{file: string, params: {}}|{file: null, params: {}}>}
 */
export async function resolveRoute(segments, routesDir = path.join(__dirname, '..', 'routes')) {

    let currentPath = routesDir;
    let params = {};
    for (const seg of segments) {
        const staticDir = path.join(currentPath, seg);
        const dynamicDir = path.join(currentPath, '[id]');
        if (await exists(staticDir)) {
            currentPath = staticDir;
        } else if (await exists(dynamicDir)) {
            currentPath = dynamicDir;
            params.id = seg;
        } else {
        return {file: null, params: {} };
    }
    }
    const file = path.join(currentPath, 'route.js');
    if (!(await exists(file))) {
     return {file: null, params: {} };
    }
    return  {file, params};
}
