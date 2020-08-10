"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForestZone {
    constructor(index, x, y, clearings) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.clearings = clearings;
        this.pieces = [];
    }
    addPiece(game, piece) {
        this.pieces.push(piece);
        game.notify();
    }
}
exports.default = ForestZone;
