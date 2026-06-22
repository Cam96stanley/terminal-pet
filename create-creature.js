const fs = require("fs");
const inquirer = require("inquirer");

module.exports = async function createCreature() {
    const answers = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What will you name your creature?"
            }
        ])
        
    const creature = {
        "name": answers.name,
        "hunger": 100,
        "happiness": 100,
        "energy": 100,
        "age": 0,
        "alive": true,
        "lastSeen": Date.now()
    }

    fs.writeFileSync("./data/creature.json", JSON.stringify(creature));
    return creature;
}