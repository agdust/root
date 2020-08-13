import Faction from '../Faction';
import { Card } from '../Card';
import { Item } from '../Item';
import Suit from '../Suit';
import Pieces, { Piece } from '../Piece';
import Game from '../Game';
import { NoMorePieces } from './rejections';
import PlayablePlayer from '../PlayablePlayer';

export default class Cult extends PlayablePlayer {
  warrior: number;
  garden_fox: number;
  garden_rabbit: number;
  garden_mouse: number;
  outcast: Suit | null;
  hated: boolean;
  acolytes: number;
  lostSouls: Card[];

  get faction() { return Faction.cult; }
  constructor() {
    super()
    this.warrior = 25;
    this.garden_fox = 5;
    this.garden_rabbit = 5;
    this.garden_mouse = 5;
    this.outcast = null;
    this.hated = false;
    this.acolytes = 0;
    this.lostSouls = [];
  }

  addItem(item: Item) {
    this.craftedItems.push(item);
  }

  setOutcast(game: Game, outcast: Suit, hated: boolean = false) {
    this.outcast = outcast;
    this.hated = hated;
    game.notify();
  }

  placeWarriors(game: Game, clearing: number, warriors: number, threadId: string) {
    if (this.warrior < warriors) {
      throw new NoMorePieces(threadId, Pieces.cult.warrior);
    }
    for (let i = 0; i < warriors; ++i) {
      game.board.clearings[clearing].addPiece(Pieces.cult.warrior);
      --this.warrior;
    }
    game.notify();
  }

  buildGarden(game: Game, clearing: number, threadId: string) {
    const suit = game.board.clearings[clearing].suit;
    let gardenPiece: Piece;
    switch (suit) {
      case Suit.fox:
        gardenPiece = Pieces.cult.garden_fox;
        if (!this.garden_fox) {
          throw new NoMorePieces(threadId, gardenPiece);
        }
        --this.garden_fox;
        break;
      case Suit.rabbit:
        gardenPiece = Pieces.cult.garden_rabbit;
        if (!this.garden_rabbit) {
          throw new NoMorePieces(threadId, gardenPiece);
        }
        --this.garden_rabbit;
        break;
      case Suit.mouse:
        gardenPiece = Pieces.cult.garden_mouse;
        if (!this.garden_mouse) {
          throw new NoMorePieces(threadId, gardenPiece);
        }
        --this.garden_mouse;
        break;
      default: throw new Error('Clearing missing suit');
    }
    game.board.clearings[clearing].addBuilding(gardenPiece, threadId);
    game.notify();
  }
}
