"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Leader_1 = tslib_1.__importDefault(require("../Leader"));
const Faction_1 = tslib_1.__importDefault(require("../Faction"));
const Rejection_1 = tslib_1.__importDefault(require("../Rejection"));
const Piece_1 = tslib_1.__importDefault(require("../Piece"));
const rejections_1 = require("./rejections");
class LeaderUnavailable extends Rejection_1.default {
    constructor(threadId, leader) {
        super(threadId, {
            key: 'rejection-leader-unavailable',
            params: { leader: `eyrie-leader-${leader}` },
        });
    }
}
class DuplicateRoost extends Rejection_1.default {
    constructor(threadId) {
        super(threadId, {
            key: 'rejection-duplicate-roost',
        });
    }
}
class Eyrie {
    get faction() { return Faction_1.default.eyrie; }
    constructor() {
        this.decree = {
            recruit: [],
            move: [],
            battle: [],
            build: [],
        };
        this.roost = 7;
        this.warrior = 20;
        this.leader = null;
        this.leaders = Object.values(Leader_1.default);
        this.hand = [];
        this.victoryPoints = 0;
        this.dominance = null;
        this.craftedEffects = [];
        this.craftedItems = [];
    }
    addItem(item) {
        this.craftedItems.push(item);
    }
    setLeader(game, leader, threadId) {
        if (!this.leaders.includes(leader)) {
            throw new LeaderUnavailable(threadId, leader);
        }
        this.leader = leader;
        this.leaders.splice(this.leaders.indexOf(leader), 1);
        if (!this.leaders.length) {
            this.leaders = Object.values(Leader_1.default);
        }
        game.notify();
    }
    placeWarriors(game, clearing, warriors, threadId) {
        if (this.warrior < warriors) {
            throw new rejections_1.NoMorePieces(threadId, Piece_1.default.eyrie.warrior);
        }
        for (let i = 0; i < warriors; ++i) {
            game.board.clearings[clearing].addPiece(Piece_1.default.eyrie.warrior);
            --this.warrior;
        }
        game.notify();
    }
    buildRoost(game, clearingIndex, threadId) {
        if (!this.roost) {
            throw new rejections_1.NoMorePieces(threadId, Piece_1.default.eyrie.roost);
        }
        const clearing = game.board.clearings[clearingIndex];
        if (clearing.hasBuilding(Piece_1.default.eyrie.roost)) {
            throw new DuplicateRoost(threadId);
        }
        clearing.addBuilding(Piece_1.default.eyrie.roost, threadId);
        --this.roost;
        game.notify();
    }
}
exports.default = Eyrie;
