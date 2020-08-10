"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Suit_1 = tslib_1.__importDefault(require("./Suit"));
const Item_1 = require("./Item");
class Quest {
    constructor(suit, name, requirements) {
        this.suit = suit;
        this.name = name;
        this.requirements = requirements;
    }
    get key() {
        return `${this.suit}-${this.name}`;
    }
}
exports.Quest = Quest;
const Quests = [
    new Quest(Suit_1.default.fox, 'errand', [Item_1.Item.tea, Item_1.Item.boot]),
    new Quest(Suit_1.default.fox, 'fundraising', [Item_1.Item.tea, Item_1.Item.coin]),
    new Quest(Suit_1.default.fox, 'give_a_speech', [Item_1.Item.torch, Item_1.Item.tea]),
    new Quest(Suit_1.default.fox, 'logistics_help', [Item_1.Item.boot, Item_1.Item.bag]),
    new Quest(Suit_1.default.fox, 'repair_a_shed', [Item_1.Item.torch, Item_1.Item.hammer]),
    new Quest(Suit_1.default.mouse, 'escort', [Item_1.Item.boot, Item_1.Item.boot]),
    new Quest(Suit_1.default.mouse, 'expel_bandits', [Item_1.Item.sword, Item_1.Item.sword]),
    new Quest(Suit_1.default.mouse, 'fend_off_a_bear', [Item_1.Item.torch, Item_1.Item.crossbow]),
    new Quest(Suit_1.default.mouse, 'guard_duty', [Item_1.Item.torch, Item_1.Item.sword]),
    new Quest(Suit_1.default.mouse, 'logistics_help', [Item_1.Item.boot, Item_1.Item.bag]),
    new Quest(Suit_1.default.rabbit, 'errand', [Item_1.Item.tea, Item_1.Item.boot]),
    new Quest(Suit_1.default.rabbit, 'expel_bandits', [Item_1.Item.sword, Item_1.Item.sword]),
    new Quest(Suit_1.default.rabbit, 'fend_off_a_bear', [Item_1.Item.torch, Item_1.Item.crossbow]),
    new Quest(Suit_1.default.rabbit, 'give_a_speech', [Item_1.Item.torch, Item_1.Item.tea]),
    new Quest(Suit_1.default.rabbit, 'guard_duty', [Item_1.Item.torch, Item_1.Item.sword]),
];
exports.default = Quests;
