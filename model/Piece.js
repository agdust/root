"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Faction_1 = tslib_1.__importDefault(require("./Faction"));
class Piece {
    constructor(faction, name, shape) {
        this.faction = faction;
        this.name = name;
        this.shape = shape;
    }
    get key() {
        if (this.faction) {
            return `${this.faction}-${this.name}`;
        }
        else {
            return this.name;
        }
    }
    toJSON() {
        return { ...this, key: this.key };
    }
    static equals(piece, other) {
        return piece.key === other.key;
    }
}
exports.Piece = Piece;
const Pieces = {
    marquise: {
        keep: new Piece(Faction_1.default.marquise, 'keep', 'round'),
        wood: new Piece(Faction_1.default.marquise, 'wood', 'round'),
        warrior: new Piece(Faction_1.default.marquise, 'warrior', 'other'),
        sawmill: new Piece(Faction_1.default.marquise, 'sawmill', 'square'),
        workshop: new Piece(Faction_1.default.marquise, 'workshop', 'square'),
        recruiter: new Piece(Faction_1.default.marquise, 'recruiter', 'square'),
    },
    eyrie: {
        roost: new Piece(Faction_1.default.eyrie, 'roost', 'square'),
        warrior: new Piece(Faction_1.default.eyrie, 'warrior', 'other'),
    },
    alliance: {
        sympathy: new Piece(Faction_1.default.alliance, 'sympathy', 'round'),
        base_fox: new Piece(Faction_1.default.alliance, 'base_fox', 'square'),
        base_rabbit: new Piece(Faction_1.default.alliance, 'base_rabbit', 'square'),
        base_mouse: new Piece(Faction_1.default.alliance, 'base_mouse', 'square'),
        warrior: new Piece(Faction_1.default.alliance, 'warrior', 'other'),
    },
    vagabond: {
        warrior: new Piece(Faction_1.default.vagabond, 'warrior', 'other'),
    },
    vagabond2: {
        warrior: new Piece(Faction_1.default.vagabond2, 'warrior', 'other'),
    },
    cult: {
        warrior: new Piece(Faction_1.default.cult, 'warrior', 'other'),
        outcast: new Piece(Faction_1.default.cult, 'outcast', 'square'),
        hated_outcast: new Piece(Faction_1.default.cult, 'hated_outcast', 'square'),
        garden_fox: new Piece(Faction_1.default.cult, 'garden_fox', 'square'),
        garden_rabbit: new Piece(Faction_1.default.cult, 'garden_rabbit', 'square'),
        garden_mouse: new Piece(Faction_1.default.cult, 'garden_mouse', 'square'),
    },
    riverfolk: {
        warrior: new Piece(Faction_1.default.riverfolk, 'warrior', 'other'),
        trade_post_fox: new Piece(Faction_1.default.riverfolk, 'trade_post_fox', 'round'),
        trade_post_rabbit: new Piece(Faction_1.default.riverfolk, 'trade_post_rabbit', 'round'),
        trade_post_mouse: new Piece(Faction_1.default.riverfolk, 'trade_post_mouse', 'round'),
    },
    marquise_bot: {
        warrior: new Piece(Faction_1.default.marquise_bot, 'warrior', 'other'),
    },
    ruin: new Piece(null, 'ruin', 'square'),
};
exports.default = Pieces;
