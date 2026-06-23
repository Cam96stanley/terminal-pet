const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const main = require("./main");
const createCreature = require("./create-creature");
const updateHunger = require("./update-hunger");
const updateHappiness = require("./update-happiness");
const updateEnergy = require("./update-energy");
const displayStats = require("./displayStats");
const displayCreature = require("./displayCreature");

async function run() {
    const creature = await main();

    console.log(chalk.green(`Welcome back, ${creature.name} has been waiting for you!`));

    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "Ready?",
            choices: ["Start"],
        }
    ]);

    if (creature.alive) {
        while (true) {
            console.clear();
            displayCreature(creature);
            displayStats(creature);

            const care = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: `What would you like to do with ${creature.name}?`,
                choices: ["Feed", "Play", "Sleep", "Quit"]
            }
            ]);
                if (care.choice === "Feed") {
                    updateHunger(creature);
                }
                if (care.choice === "Play") {
                    updateHappiness(creature);
                }
                if (care.choice === "Sleep") {
                    updateEnergy(creature);
                }
                if (care.choice === "Quit") {
                    process.exit();
                }
        }
    } else {
        console.log(chalk.red(`${creature.name} has died...`));
    
        const restart = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: ["Start over", "Quit"]
            }
        ]);
    
        if (restart.choice === "Start over") {
            fs.unlinkSync("./data/creature.json");
            await createCreature();
            await run();
        } else {
            process.exit();
        }
    }
}

run();