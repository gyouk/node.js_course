import express from 'express';
import { BrewDTO } from '../dto/brew.dto.js';
import validate from '../middlewares/validate.js';
import rateLimiter from '../middlewares/rateLimit.js';

const brewRoutes = ({ brewController }) => {
    const router = express.Router();

    router.get('/', brewController.getAll);
    router.get('/:id', brewController.getById);
    router.post('/', rateLimiter, validate(BrewDTO), brewController.create);
    router.put('/:id', validate(BrewDTO), brewController.update);
    router.delete('/:id', brewController.delete);

    return router;
};

export default brewRoutes;