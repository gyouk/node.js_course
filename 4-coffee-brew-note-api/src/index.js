import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import container from "./di/container.js";
import brewRoutes from "./routes/brew.routes.js";

/**
 * Express application instance.
 * @type {Express}
 */
const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/brews', brewRoutes({brewController: container.resolve('brewController')}));


