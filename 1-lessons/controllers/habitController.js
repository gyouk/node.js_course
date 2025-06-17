import { add, list, markDone, getStats, remove, update }from'../services/habitService.js';

/**
 * Parses command line arguments into an object.
 *
 * @param args
 * @returns {{}}
 */
function parseArgs(args) {
    const obj = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            let key = args[i].replace('--', '');
            let value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
            obj[key] = value;
        }
    }
    return obj;
}

/**
 * Adds a new habit.
 *
 * @param args
 */
function addHabit(args) {
    const { name, freq } = parseArgs(args);
    if (!name || !freq) {
        console.log('Usage: add --name "..." --freq daily|weekly|monthly');
        return;
    }
    add(name, freq);
}

/**
 * Lists all habits.
 */
function listHabits() {
    list();
}

/**
 * Marks a habit as done by its ID.
 * @param args
 */
function doneHabit(args) {
    const { id } = parseArgs(args);
    if (!id) {
        console.log('Usage: done --id <id>');
        return;
    }
    markDone(id);
}
/**
 * Displays statistics for all habits.
 * It calculates the completion percentage for each habit based on its frequency.
 */

function statsHabits() {
    getStats();
}

/**
 * Deletes a habit by its ID.
 * @param {string[]} args - Command line arguments.
 */

function deleteHabit(args) {
    const { id } = parseArgs(args);
    if (!id) {
        console.log('Usage: delete --id <id>');
        return;
    }
    remove(id);
}

/**
 * Updates a habit's name and/or frequency by its ID.
 * @param {string[]} args - Command line arguments.
 * @param args
 */
function updateHabit(args) {
    const { id, name, freq } = parseArgs(args);
    if (!id) {
        console.log('Usage: update --id <id> [--name "..."] [--freq ...]');
        return;
    }
    update(id, name, freq);
}

export{ addHabit, listHabits, doneHabit, statsHabits, deleteHabit, updateHabit };
