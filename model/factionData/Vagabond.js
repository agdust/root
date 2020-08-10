"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Item_1 = require("../Item");
const Rejection_1 = tslib_1.__importDefault(require("../Rejection"));
class CharacterAlreadyTaken extends Rejection_1.default {
    constructor(threadId, character) {
        super(threadId, {
            key: 'rejection-character-already-taken',
            params: { character: `vagbond-character-${character.name}` },
        });
    }
}
class Vagabond {
    constructor(faction) {
        this.faction = faction;
        this.character = null;
        this.items = {
            refreshed: [],
            exhausted: [],
            damaged: [],
        };
        this.relations = {
            marquise: 1,
            eyrie: 1,
            alliance: 1,
            cult: 1,
            riverfolk: 1,
        };
        this.coalition = null;
        this.ruinItems = [
            new Item_1.Item(Item_1.Item.hammer, true),
            new Item_1.Item(Item_1.Item.boot, true),
            new Item_1.Item(Item_1.Item.sword, true),
            new Item_1.Item(Item_1.Item.bag, true),
        ];
        this.hand = [];
        this.craftedEffects = [];
        this.victoryPoints = 0;
    }
    addItem(item) {
        this.items.refreshed.push(item);
    }
    setCharacter(game, character, threadId) {
        const charactersTaken = [
            game.factionData.vagabond && game.factionData.vagabond.character,
            game.factionData.vagabond2 && game.factionData.vagabond2.character,
        ];
        if (this.character) {
            throw new Error(`${this.faction} already has a character set`);
        }
        if (charactersTaken.includes(character.name)) {
            throw new CharacterAlreadyTaken(threadId, character);
        }
        this.character = character.name;
        this.items.refreshed.push(...character.startingItems);
        game.notify();
    }
}
exports.default = Vagabond;
