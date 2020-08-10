"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Faction_1 = tslib_1.__importDefault(require("../Faction"));
const Suit_1 = tslib_1.__importDefault(require("../Suit"));
const Piece_1 = tslib_1.__importDefault(require("../Piece"));
const rejections_1 = require("./rejections");
class Cult {
    get faction() { return Faction_1.default.cult; }
    constructor() {
        this.warrior = 25;
        this.garden_fox = 5;
        this.garden_rabbit = 5;
        this.garden_mouse = 5;
        this.outcast = null;
        this.hated = false;
        this.acolytes = 0;
        this.lostSouls = [];
        this.hand = [];
        this.victoryPoints = 0;
        this.dominance = null;
        this.craftedEffects = [];
        this.craftedItems = [];
    }
    addItem(item) {
        this.craftedItems.push(item);
    }
    setOutcast(game, outcast, hated = false) {
        this.outcast = outcast;
        this.hated = hated;
        game.notify();
    }
    placeWarriors(game, clearing, warriors, threadId) {
        if (this.warrior < warriors) {
            throw new rejections_1.NoMorePieces(threadId, Piece_1.default.cult.warrior);
        }
        for (let i = 0; i < warriors; ++i) {
            game.board.clearings[clearing].addPiece(Piece_1.default.cult.warrior);
            --this.warrior;
        }
        game.notify();
    }
    buildGarden(game, clearing, threadId) {
        const suit = game.board.clearings[clearing].suit;
        let gardenPiece;
        switch (suit) {
            case Suit_1.default.fox:
                gardenPiece = Piece_1.default.cult.garden_fox;
                if (!this.garden_fox) {
                    throw new rejections_1.NoMorePieces(threadId, gardenPiece);
                }
                --this.garden_fox;
                break;
            case Suit_1.default.rabbit:
                gardenPiece = Piece_1.default.cult.garden_rabbit;
                if (!this.garden_rabbit) {
                    throw new rejections_1.NoMorePieces(threadId, gardenPiece);
                }
                --this.garden_rabbit;
                break;
            case Suit_1.default.mouse:
                gardenPiece = Piece_1.default.cult.garden_mouse;
                if (!this.garden_mouse) {
                    throw new rejections_1.NoMorePieces(threadId, gardenPiece);
                }
                --this.garden_mouse;
                break;
            default: throw new Error('Clearing missing suit');
        }
        game.board.clearings[clearing].addBuilding(gardenPiece, threadId);
        game.notify();
    }
}
exports.default = Cult;
