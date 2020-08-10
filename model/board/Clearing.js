"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Rejection_1 = tslib_1.__importDefault(require("../Rejection"));
const Piece_1 = tslib_1.__importStar(require("../Piece"));
const Faction_1 = tslib_1.__importDefault(require("../Faction"));
class NoRuins extends Error {
    constructor() {
        super('There is no ruin in this clearing');
    }
}
class NoMoreSlots extends Rejection_1.default {
    constructor(threadId) {
        super(threadId, {
            key: 'rejection-no-more-slots',
        });
    }
}
class Clearing {
    constructor(index, x, y, suit, slots = [], isCorner = false, acrossCorner = null) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.suit = suit;
        this.slots = slots;
        this.isCorner = isCorner;
        this.acrossCorner = acrossCorner;
        this.buildings = slots.map(slot => slot.isRuin ? Piece_1.default.ruin : null);
        this.pieces = [];
        this.ruinItems = [];
    }
    static ruler(game, faction, clearing) {
        const hasGarden = clearing.buildings.some(building => !!building && (Piece_1.Piece.equals(building, Piece_1.default.cult.garden_fox)
            || Piece_1.Piece.equals(building, Piece_1.default.cult.garden_mouse)
            || Piece_1.Piece.equals(building, Piece_1.default.cult.garden_rabbit)));
        if (hasGarden) {
            return Faction_1.default.cult;
        }
        const scores = {
            marquise: 0,
            eyrie: 0,
            alliance: 0,
            riverfolk: 0,
            cult: 0,
            vagabond: 0,
            vagabond2: 0,
            marquise_bot: 0,
        };
        clearing
            .pieces
            .filter(piece => piece.name === 'warrior')
            .map(piece => piece.faction)
            .filter((faction) => faction !== null)
            .filter(faction => faction !== Faction_1.default.vagabond && faction !== Faction_1.default.vagabond2)
            .map(f => (game.services.mercenaries && f === Faction_1.default.riverfolk) ? faction : f)
            .forEach(faction => scores[faction]++);
        clearing
            .buildings
            .map(piece => piece && piece.faction)
            .filter((faction) => faction !== null)
            .forEach(faction => scores[faction]++);
        const best = Object.entries(scores)
            .reduce((best, score) => score[1] > best[1] ? score : best);
        if (best[1] === scores.eyrie && scores.eyrie > 0) {
            return Faction_1.default.eyrie;
        }
        else {
            return best[0];
        }
    }
    static hasBuilding(clearing, piece) {
        return clearing.buildings.some(p => !!p && Piece_1.Piece.equals(piece, p));
    }
    addPiece(piece) {
        this.pieces.push(piece);
    }
    removePiece(index) {
        const [piece] = this.pieces.splice(index, 1);
        return piece;
    }
    addBuilding(building, threadId) {
        const emptySlot = this.buildings.indexOf(null);
        if (emptySlot === -1) {
            throw new NoMoreSlots(threadId);
        }
        this.buildings[emptySlot] = building;
    }
    hasBuilding(piece) {
        return Clearing.hasBuilding(this, piece);
    }
    get hasRuins() {
        return this.hasBuilding(Piece_1.default.ruin);
    }
    addRuinItem(item) {
        if (!this.buildings.includes(Piece_1.default.ruin)) {
            throw new NoRuins;
        }
        this.ruinItems.push(item);
    }
    toJSON() {
        return {
            ...this,
            hasRuins: this.hasRuins,
            ruinItems: this.ruinItems.length,
        };
    }
}
exports.default = Clearing;
