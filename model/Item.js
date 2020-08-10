"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, isRuin = false, isStarting = false) {
        this.name = name;
        this.isRuin = isRuin;
        this.isStarting = isStarting;
    }
    static get tea() { return 'tea'; }
    static get bag() { return 'bag'; }
    static get coin() { return 'coin'; }
    static get sword() { return 'sword'; }
    static get crossbow() { return 'crossbow'; }
    static get torch() { return 'torch'; }
    static get boot() { return 'boot'; }
    static get hammer() { return 'hammer'; }
    static equals(item, other) {
        return item.key === other.key;
    }
    get key() {
        if (this.isRuin) {
            return `item-ruin_${this.name}`;
        }
        return `item-${this.name}`;
    }
    toJSON() {
        return { ...this, key: this.key };
    }
}
exports.Item = Item;
const Items = [
    new Item(Item.tea),
    new Item(Item.tea),
    new Item(Item.bag),
    new Item(Item.bag),
    new Item(Item.coin),
    new Item(Item.coin),
    new Item(Item.sword),
    new Item(Item.sword),
    new Item(Item.boot),
    new Item(Item.boot),
    new Item(Item.hammer),
    new Item(Item.crossbow),
];
exports.default = Items;
