const fs = require("fs");

module.exports = function feedCreature(creature) {
    creature.hunger = Math.min(100, creature.hunger + 30);
    fs.writeFileSync("./data/creature.json", JSON.stringify(creature));
}