import Faction from '../Faction';
import Game from '../Game';
import Pieces, { Piece } from '../Piece';
import { Item } from '../Item';
import { NoMorePieces } from './rejections';
import PlayablePlayer from '../PlayablePlayer';

export type ServiceCosts = {
  handCard: number,
  riverboats: number,
  mercenaries: number,
};

export default class Riverfolk extends PlayablePlayer {
  warrior: number;
  trade_post_fox: number;
  trade_post_rabbit: number;
  trade_post_mouse: number;
  funds: {
    payments: Piece[],
    funds: Piece[],
    commitments: Piece[],
    crafted: {
      fox: Piece[],
      rabbit: Piece[],
      mouse: Piece[],
    },
  };
  services: ServiceCosts;

  constructor() {
    super();
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
  }

  get faction() { return Faction.riverfolk; }

  addItem(item: Item) {
    this.craftedItems.push(item);
  }

  placeWarriors(game: Game, clearing: number, count = 1, threadId: string) {
    if (this.warrior < count) {
      throw new NoMorePieces(threadId, Pieces.riverfolk.warrior);
    }
    for (let i = 0; i < count; ++i) {
      game.board.clearings[clearing].addPiece(Pieces.riverfolk.warrior);
      --this.warrior;
    }
    game.notify();
  }

  takeWarrior(count: number, threadId: string): Piece[] {
    if (this.warrior < count) {
      throw new NoMorePieces(threadId, Pieces.riverfolk.warrior);
    }
    this.warrior -= count;
    return new Array(count).fill(Pieces.riverfolk.warrior);
  }

  setPrices(game: Game, prices: ServiceCosts) {
    this.services = prices;
    game.notify();
  }

  receivePayment(game: Game, ...payment: Piece[]) {
    this.funds.payments.push(...payment);
    game.notify();
  }
}
