"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Faction_1 = tslib_1.__importDefault(require("../Faction"));
class Alliance {
    get faction() { return Faction_1.default.alliance; }
    constructor() {
        this.base_mouse = 1;
        this.base_fox = 1;
        this.base_rabbit = 1;
        this.sympathy = 10;
        this.supporters = [];
        this.warrior = 10;
        this.officers = 0;
        this.hand = [];
        this.victoryPoints = 0;
        this.craftedItems = [];
        this.craftedEffects = [];
        this.dominance = null;
    }
    addItem(item) {
        this.craftedItems.push(item);
    }
    drawSupporter(game, count = 1) {
        const cards = game.takeCards(count);
        this.supporters.push(...cards);
        game.notify();
    }
    addSupporter(card) {
        this.supporters.push(card);
    }
}
exports.default = Alliance;
