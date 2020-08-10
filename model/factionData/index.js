"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Alliance_js_1 = tslib_1.__importDefault(require("./Alliance.js"));
const Cult_js_1 = tslib_1.__importDefault(require("./Cult.js"));
const Eyrie_js_1 = tslib_1.__importDefault(require("./Eyrie.js"));
const Marquise_js_1 = tslib_1.__importDefault(require("./Marquise.js"));
const MarquiseBot_js_1 = tslib_1.__importDefault(require("./MarquiseBot.js"));
const Riverfolk_js_1 = tslib_1.__importDefault(require("./Riverfolk.js"));
const Vagabond_js_1 = tslib_1.__importDefault(require("./Vagabond.js"));
const Faction_js_1 = tslib_1.__importDefault(require("../Faction.js"));
class UnknownFaction extends Error {
    constructor(faction) {
        super(`No such faction ${faction}`);
    }
}
function createFaction(faction) {
    switch (faction) {
        case Faction_js_1.default.marquise:
            return new Marquise_js_1.default;
        case Faction_js_1.default.eyrie:
            return new Eyrie_js_1.default;
        case Faction_js_1.default.alliance:
            return new Alliance_js_1.default;
        case Faction_js_1.default.vagabond:
        case Faction_js_1.default.vagabond2:
            return new Vagabond_js_1.default(faction);
        case Faction_js_1.default.cult:
            return new Cult_js_1.default;
        case Faction_js_1.default.riverfolk:
            return new Riverfolk_js_1.default;
        case Faction_js_1.default.marquise_bot:
            return new MarquiseBot_js_1.default;
        default:
            throw new UnknownFaction(faction);
    }
}
exports.default = createFaction;
