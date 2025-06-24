import service from '../../../services/users.service.js';
import {sendJson, sendError} from '../../../lib/send.js';

/**
 * Handles requests for a specific user by ID.
 */
export default {
    async GET(req, res, { id }) {
        try {
            const user = await service.getById(id);
            if (!user) {
                sendError( res,'User not found!', 404);
                return;
            }
            sendJson(res, user);
        }catch (error) {
            sendError(res, 'internal server error', 500);
        }
    },

    async PUT(req, res, { id, body }) {
        if (!body?.name) {
            sendJson(res, 'user is already exist!', 400);
            return;
        }
        try{
            const updated = await service.update(id, body);
            if (!updated) {
                sendError(res,'User not found', 404);
                return;
            }
        }  catch (error) {
            sendError(res, 'internal server error', 500);
        }
    },
    async DELETE(req, res, { id }) {
        try {
            const user = await service.remove(id);
            if (!user) {
                sendError(res, 'User not found', 404);
                return;
            }
            // TODO remember status 204 for DELETE/PUT
            /**
             *
             * https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204
             *
             */
            res.writeHead(204);
            res.end();
        } catch (error) {
            sendError(res, 'internal server error', 500);
        }
    }
};