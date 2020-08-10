import Leader from '../Leader';
import Faction from '../Faction';
import Rejection from '../Rejection';
import Piece from '../Piece';
import Game from '../Game';
import { Card } from '../Card';
import { Item } from '../Item';
import { NoMorePieces } from './rejections';

class LeaderUnavailable extends Rejection {
  constructor(threadId: string, leader: Leader) {
    super(threadId, {
      key: 'rejection-leader-unavailable',
      params: { leader: `eyrie-leader-${leader}` },
    });
  }
}

class DuplicateRoost extends Rejection {
  constructor(threadId: string) {
    super(threadId, {
      key: 'rejection-duplicate-roost',
    });
  }
}

type Decree = {
  recruit: Card[],
  move: Card[],
  battle: Card[],
  build: Card[],
}

export default class Eyrie {
  decree: Decree;
  roost: number;
  warrior: number;
  leader: string | null;
  leaders: Leader[];
  hand: Card[];
  victoryPoints: number;
  dominance: Card | null;
  craftedItems: Item[];
  craftedEffects: Card[];

  get faction() { return Faction.eyrie; }
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
    this.leaders = Object.values(Leader);
    // common stuff
    this.hand = [];
    this.victoryPoints = 0;
    this.dominance = null;
    this.craftedEffects = [];
    this.craftedItems = [];
  }

  addItem(item: Item) {
    this.craftedItems.push(item);
  }

  setLeader(game: Game, leader: Leader, threadId: string) {
    if (!this.leaders.includes(leader)) {
      throw new LeaderUnavailable(threadId, leader);
    }
    this.leader = leader;
    this.leaders.splice(this.leaders.indexOf(leader), 1);
    if (!this.leaders.length) {
      this.leaders = Object.values(Leader);
      // TODO: check if this includes the one that is currently in use!
    }
    game.notify();
  }

  placeWarriors(game: Game, clearing: number, warriors: number, threadId: string) {
    if (this.warrior < warriors) {
      throw new NoMorePieces(threadId, Piece.eyrie.warrior);
    }
    for (let i = 0; i < warriors; ++i) {
      game.board.clearings[clearing].addPiece(Piece.eyrie.warrior);
      --this.warrior;
    }
    game.notify();
  }

  buildRoost(game: Game, clearingIndex: number, threadId: string) {
    if (!this.roost) {
      throw new NoMorePieces(threadId, Piece.eyrie.roost);
    }
    const clearing = game.board.clearings[clearingIndex];
    if (clearing.hasBuilding(Piece.eyrie.roost)) {
      throw new DuplicateRoost(threadId);
    }
    clearing.addBuilding(Piece.eyrie.roost, threadId);
    --this.roost;
    game.notify();
  }
}
