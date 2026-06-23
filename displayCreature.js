const chalk = require("chalk");
const happyFrames = require("./frames/happy-frames");
const neutralFrames = require("./frames/neutral-frames");
const sadFrames = require("./frames/sad-frames");
const deadFrames = require("./frames/dead-frame");

let frameIndex = 0;

module.exports = function displayCreature(creature) {

    if (!creature.alive) {
        const frame = deadFrames[frameIndex % deadFrames.length];
        frameIndex++
        console.log(chalk.red(frame));
    } else if (creature.hunger < 30 || creature.happiness < 30 || creature.energy < 30) {
        const frame = sadFrames[frameIndex % sadFrames.length];
        frameIndex++
        console.log(chalk.blue(frame));
    } else if (creature.hunger < 70 || creature.happiness < 70 || creature.energy < 70) {
        const frame = neutralFrames[frameIndex % neutralFrames.length];
        frameIndex++
        console.log(chalk.yellow(frame));
    } else {
        const frame = happyFrames[frameIndex % happyFrames.length];
        frameIndex++
        console.log(chalk.green(frame));
    }
}