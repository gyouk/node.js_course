import{ createContainer, asClass } from 'awilix';
import {BrewService} from '../services/brew.services.js';
import {BrewController} from '../controllers/brew.controller.js';

/**
 * Dependency Injection Container
 */
const container = createContainer();
/**
 * Registering dependencies in the container
 */
container.register({
    brewService: asClass(BrewService).singleton(),
    brewController: asClass(BrewController).singleton(),
});
/**
 * Exporting the container for use in the application
 */
export default container;
