const chalk = require("chalk");

module.exports = function displayStats(creature) {
    buildBar("Hunger", creature.hunger);
    buildBar("Happiness", creature.happiness);
    buildBar("Energy", creature.energy);
}

function buildBar(label, value) {
    const filled = Math.round(value / 5);
    const empty = 20 - filled;
    const bar = "█".repeat(filled) + "░".repeat(empty);

    let color;
    if (value > 60) {
        color = chalk.green(bar);
    } else if (value > 30) {
        color = chalk.yellow(bar);
    } else {
        color = chalk.red(bar);
    }

    console.log(`${label.padEnd(12)} [${color}] ${Math.round(value)}/100`);
}