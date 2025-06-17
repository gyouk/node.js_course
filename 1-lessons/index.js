import 'dotenv/config';
import { route } from './router/router.js';

/**
 * Routes the command line arguments to the appropriate controller function.
 */
route(process.argv.slice(2));
