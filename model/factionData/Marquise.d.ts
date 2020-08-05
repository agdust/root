import Faction from '../Faction';
import { Piece } from '../Piece';
import Game from '../Game';
import { Card } from '../Card';
import { Item } from '../Item';
export default class Marquise {
    sawmill: number;
    workshop: number;
    recruiter: number;
    warrior: number;
    wood: number;
    keep: number;
    hand: Card[];
    victoryPoints: number;
    dominance: Card | null;
    craftedEffects: Card[];
    craftedItems: Item[];
    readonly faction: Faction;
    constructor();
    addItem(item: Item): void;
    placeKeep(game: Game, clearing: number): void;
    placeBuilding(game: Game, clearing: number, building: Piece, threadId: string): void;
    placeWood(game: Game, clearing: number, threadId: string | null): void;
}
