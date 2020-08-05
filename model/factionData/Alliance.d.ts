import Faction from '../Faction';
import Game from '../Game';
import { Card } from '../Card';
import { Item } from '../Item';
export default class Alliance {
    warrior: number;
    sympathy: number;
    base_fox: number;
    base_rabbit: number;
    base_mouse: number;
    supporters: Card[];
    officers: number;
    hand: Card[];
    victoryPoints: number;
    craftedItems: Item[];
    craftedEffects: Card[];
    dominance: Card | null;
    readonly faction: Faction;
    constructor();
    addItem(item: Item): void;
    drawSupporter(game: Game, count?: number): void;
    addSupporter(card: Card): void;
}
