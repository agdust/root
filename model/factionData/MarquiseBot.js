"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Faction_1 = tslib_1.__importDefault(require("../Faction"));
class MarquiseBot {
    get faction() { return Faction_1.default.marquise_bot; }
    constructor() {
        this.warrior = 25;
        this.orders = [];
        this.victoryPoints = 0;
        this.craftedItems = [];
    }
}
exports.default = MarquiseBot;
