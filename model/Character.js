"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("./Item");
class Character {
    constructor(name, startingItems) {
        this.name = name;
        this.startingItems = startingItems;
    }
}
exports.Character = Character;
const Characters = {
    arbiter: new Character('arbiter', [
        new Item_1.Item(Item_1.Item.boot, false, true),
        new Item_1.Item(Item_1.Item.torch, false, true),
        new Item_1.Item(Item_1.Item.sword, false, true),
        new Item_1.Item(Item_1.Item.sword, false, true),
    ]),
    ranger: new Character('ranger', [
        new Item_1.Item(Item_1.Item.boot, false, true),
        new Item_1.Item(Item_1.Item.torch, false, true),
        new Item_1.Item(Item_1.Item.crossbow, false, true),
        new Item_1.Item(Item_1.Item.sword, false, true),
    ]),
    scoundrel: new Character('scoundrel', [
        new Item_1.Item(Item_1.Item.boot, false, true),
        new Item_1.Item(Item_1.Item.boot, false, true),
        new Item_1.Item(Item_1.Item.torch, false, true),
        new Item_1.Item(Item_1.Item.crossbow, false, true),
    ]),
    thief: new Character('thief', [
        new Item_1.Item(Item_1.Item.boot, false, true),
        new Item_1.Item(Item_1.Item.torch, false, true),
        new Item_1.Item(Item_1.Item.tea, false, true),
        new Item_1.Item(Item_1.Item.sword, false, true),
    ]),
    tinker: new Character('tinker', [
        new Item_1.Item(Item_1.Item.boot, false, true),
        new Item_1.Item(Item_1.Item.torch, false, true),
        new Item_1.Item(Item_1.Item.bag, false, true),
        new Item_1.Item(Item_1.Item.hammer, false, true),
    ]),
    vagrant: new Character('vagrant', [
        new Item_1.Item(Item_1.Item.coin, false, true),
        new Item_1.Item(Item_1.Item.torch, false, true),
        new Item_1.Item(Item_1.Item.boot, false, true),
    ]),
};
exports.default = Characters;
