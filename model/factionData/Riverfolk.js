"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Faction_1 = tslib_1.__importDefault(require("../Faction"));
const Piece_1 = tslib_1.__importDefault(require("../Piece"));
const rejections_1 = require("./rejections");
class Riverfolk {
    get faction() { return Faction_1.default.riverfolk; }
    constructor() {
        this.warrior = 15;
        this.trade_post_fox = 3;
        this.trade_post_rabbit = 3;
        this.trade_post_mouse = 3;
        this.funds = {
            payments: [],
            funds: [],
            commitments: [],
            crafted: {
                fox: [],
                rabbit: [],
                mouse: [],
            },
        };
        this.services = {
            handCard: 1,
            riverboats: 1,
            mercenaries: 1,
        };
        this.hand = [];
        this.victoryPoints = 0;
        this.dominance = null;
        this.craftedEffects = [];
        this.craftedItems = [];
    }
    addItem(item) {
        this.craftedItems.push(item);
    }
    placeWarriors(game, clearing, count = 1, threadId) {
        if (this.warrior < count) {
            throw new rejections_1.NoMorePieces(threadId, Piece_1.default.riverfolk.warrior);
        }
        for (let i = 0; i < count; ++i) {
            game.board.clearings[clearing].addPiece(Piece_1.default.riverfolk.warrior);
            --this.warrior;
        }
        game.notify();
    }
    takeWarrior(count, threadId) {
        if (this.warrior < count) {
            throw new rejections_1.NoMorePieces(threadId, Piece_1.default.riverfolk.warrior);
        }
        this.warrior -= count;
        return new Array(count).fill(Piece_1.default.riverfolk.warrior);
    }
    setPrices(game, prices) {
        this.services = prices;
        game.notify();
    }
    receivePayment(game, ...payment) {
        this.funds.payments.push(...payment);
        game.notify();
    }
}
exports.default = Riverfolk;
