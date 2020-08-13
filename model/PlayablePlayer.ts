import { Card } from './Card';
import { Item } from './Item';

export default class PlayablePlayer {
  hand: Card[];
  victoryPoints: number;
  dominance: Card | null;
  craftedEffects: Card[];
  craftedItems: Item[];

  constructor() {
    this.hand = [];
    this.victoryPoints = 0;
    this.dominance = null;
    this.craftedEffects = [];
    this.craftedItems = [];
  }
}
