const fs = require("fs");

module.exports = function updateEnergy(creature) {
    creature.energy = Math.min(100, creature.energy + 30);
    fs.writeFileSync("./data/creature.json", JSON.stringify(creature));
}