"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Board_1 = tslib_1.__importDefault(require("./Board"));
const Clearing_1 = tslib_1.__importDefault(require("./Clearing"));
const ForestZone_1 = tslib_1.__importDefault(require("./ForestZone"));
const Slot_1 = tslib_1.__importDefault(require("./Slot"));
const Suit_1 = tslib_1.__importDefault(require("../Suit"));
class Forest extends Board_1.default {
    constructor() {
        super('forest', [
            new Clearing_1.default(0, 547, 619, Suit_1.default.fox, [new Slot_1.default(430, 566)], true, 2),
            new Clearing_1.default(1, 4213, 1044, Suit_1.default.mouse, [new Slot_1.default(4204, 966), new Slot_1.default(4312, 1180)], true, 3),
            new Clearing_1.default(2, 4008, 3863, Suit_1.default.rabbit, [new Slot_1.default(3905, 3819)], true, 0),
            new Clearing_1.default(3, 548, 3622, Suit_1.default.rabbit, [new Slot_1.default(721, 3594)], true, 1),
            new Clearing_1.default(4, 2635, 446, Suit_1.default.rabbit, [new Slot_1.default(2479, 340), new Slot_1.default(2739, 314)]),
            new Clearing_1.default(5, 4364, 2336, Suit_1.default.fox, [new Slot_1.default(4187, 2370), new Slot_1.default(4404, 2139, true)]),
            new Clearing_1.default(6, 2818, 3424, Suit_1.default.mouse, [new Slot_1.default(2798, 3230), new Slot_1.default(2636, 3478)]),
            new Clearing_1.default(7, 1732, 3926, Suit_1.default.fox, [new Slot_1.default(1902, 3724), new Slot_1.default(1826, 4006)]),
            new Clearing_1.default(8, 508, 1762, Suit_1.default.mouse, [new Slot_1.default(608, 1642), new Slot_1.default(408, 2026)]),
            new Clearing_1.default(9, 2054, 1250, Suit_1.default.rabbit, [new Slot_1.default(1856, 1176), new Slot_1.default(2124, 1508, true)]),
            new Clearing_1.default(10, 3050, 2160, Suit_1.default.mouse, [new Slot_1.default(2966, 1994), new Slot_1.default(3142, 2142), new Slot_1.default(2946, 2290, true)]),
            new Clearing_1.default(11, 1496, 2444, Suit_1.default.fox, [new Slot_1.default(1488, 2628), new Slot_1.default(1694, 2414, true)]),
        ], [
            [0, 4], [0, 9], [0, 8],
            [1, 4], [1, 5], [1, 9],
            [2, 5], [2, 6], [2, 10],
            [3, 7], [3, 8], [3, 11],
            [5, 10],
            [6, 7], [6, 11],
            [9, 11],
            [10, 11],
        ], [[4, 9], [9, 10], [10, 6], [6, 3]], [
            new ForestZone_1.default(0, 2303, 867, [0, 1, 4, 9]),
            new ForestZone_1.default(1, 1265, 1526, [0, 8, 9, 11]),
            new ForestZone_1.default(2, 3003, 1689, [1, 5, 9, 10, 11]),
            new ForestZone_1.default(3, 826, 2629, [3, 8, 11]),
            new ForestZone_1.default(4, 1653, 3342, [3, 6, 7, 11]),
            new ForestZone_1.default(5, 2763, 2862, [2, 6, 10, 11]),
            new ForestZone_1.default(6, 3865, 2812, [2, 5, 10]),
        ], { x: 192, y: 4229 });
    }
}
exports.default = Forest;
