"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Rejection_1 = tslib_1.__importDefault(require("../Rejection"));
class InvalidStartClearing extends Rejection_1.default {
    constructor(threadId) {
        super(threadId, {
            key: 'rejection-invalid-start-clearing',
        });
    }
}
exports.InvalidStartClearing = InvalidStartClearing;
class NoMorePieces extends Rejection_1.default {
    constructor(threadId, piece) {
        super(threadId, {
            key: 'rejection-no-more-pieces',
            params: { piece: piece.key },
        });
    }
}
exports.NoMorePieces = NoMorePieces;
