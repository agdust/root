"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Faction_1 = tslib_1.__importDefault(require("../Faction"));
const Piece_1 = tslib_1.__importDefault(require("../Piece"));
const rejections_1 = require("./rejections");
class Marquise {
    get faction() { return Faction_1.default.marquise; }
    constructor() {
        this.sawmill = 6;
        this.workshop = 6;
        this.recruiter = 6;
        this.warrior = 25;
        this.wood = 8;
        this.keep = 1;
        this.hand = [];
        this.victoryPoints = 0;
        this.dominance = null;
        this.craftedEffects = [];
        this.craftedItems = [];
    }
    addItem(item) {
        this.craftedItems.push(item);
    }
    placeKeep(game, clearing) {
        --this.keep;
        game.board.clearings[clearing].addPiece(Piece_1.default.marquise.keep);
        for (const otherClearing of game.board.clearings) {
            if (otherClearing.acrossCorner !== clearing) {
                --this.warrior;
                otherClearing.addPiece(Piece_1.default.marquise.warrior);
            }
        }
        game.notify();
    }
    placeBuilding(game, clearing, building, threadId) {
        if (!this[building.name]) {
            throw new rejections_1.NoMorePieces(threadId, building);
        }
        game.board.clearings[clearing].addBuilding(building, threadId);
        --this[building.name];
        game.notify();
    }
    placeWood(game, clearing, threadId) {
        if (!this.wood) {
            if (threadId) {
                throw new rejections_1.NoMorePieces(threadId, Piece_1.default.marquise.wood);
            }
            else {
                return;
            }
        }
        game.board.clearings[clearing].addPiece(Piece_1.default.marquise.wood);
        --this.wood;
        game.notify();
    }
}
exports.default = Marquise;
