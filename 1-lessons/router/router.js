import { addHabit,
    listHabits,
    doneHabit,
    statsHabits,
    deleteHabit,
    updateHabit } from'../controllers/habitController.js';

/**
 * Routes the command to the appropriate controller function based on the command name.
 *
 * @param argv
 */
function route(argv) {
    const [command, ...args] = argv;

    switch (command) {
        case 'add':
            addHabit(args);
            break;
        case 'list':
            listHabits();
            break;
        case 'done':
            doneHabit(args);
            break;
        case 'stats':
            statsHabits();
            break;
        case 'delete':
            deleteHabit(args);
            break;
        case 'update':
            updateHabit(args);
            break;
        default:
            console.log('Unknown command');
    }
}

export{ route };
