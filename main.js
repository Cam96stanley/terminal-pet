const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const createCreature = require("./create-creature");

const drainRates = {
    hunger: 0.083,
    happiness: 0.05,
    energy: 0.033,
}

module.exports = async function main() {
    const creatureFile = fs.existsSync("./data/creature.json");

    if (!creatureFile) {
        return await createCreature();
    }

    const creature = JSON.parse(fs.readFileSync("./data/creature.json"));
    const now = Date.now();

    const elapsedMinutes = (now - creature.lastSeen) / 60000;
    const elapsedDays = elapsedMinutes / 1440;
    
    const hungerDecay = elapsedMinutes * drainRates.hunger;
    const happinessDecay = elapsedMinutes * drainRates.happiness;
    const energyDecay = elapsedMinutes * drainRates.energy;

    const updatedHunger = Math.max(0, creature.hunger - hungerDecay);
    const updatedHappiness = Math.max(0, creature.happiness - happinessDecay);
    const updatedEnergy = Math.max(0, creature.energy - energyDecay);
    const updatedAge = creature.age + Math.floor(elapsedDays);

    const updatedCreature = {
        name: creature.name,
        "hunger": updatedHunger,
        "happiness": updatedHappiness,
        "energy": updatedEnergy,
        "age": updatedAge,
        "lastSeen": Date.now()
    }

    if (updatedHunger <= 0 || updatedHappiness <= 0 || updatedEnergy <= 0) {
        updatedCreature.alive = false;
    } else {
        updatedCreature.alive = true;
    }

    fs.writeFileSync("./data/creature.json", JSON.stringify(updatedCreature));
    console.log(updatedCreature)
    return updatedCreature;
}