import service from '../../services/users.service.js';
import {sendJson, sendError} from '../../lib/send.js';

/**
 * Handles requests for users.
 */
export default {
    async GET(req, res) {
        try {
            const users = await service.getAll();
            sendJson(res, users);
        } catch (error) {
            sendError(res, 'internal server error', 500);
        }
    },
    async POST(req, res, { body }) {
        if (!body?.name) {
            sendError(res, 'name is required', 400);
            return;
        }
        try {
            const  user = await service.create(body);
            sendJson(res, user, 201);
        } catch (error) {
            sendError(res, 'internal server error', 500);
        }
    }
};