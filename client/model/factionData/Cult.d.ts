import Faction from '../Faction';
import { Card } from '../Card';
import { Item } from '../Item';
import Suit from '../Suit';
import Game from '../Game';
export default class Cult {
    warrior: number;
    garden_fox: number;
    garden_rabbit: number;
    garden_mouse: number;
    outcast: Suit | null;
    hated: boolean;
    acolytes: number;
    lostSouls: Card[];
    hand: Card[];
    victoryPoints: number;
    dominance: Card | null;
    craftedEffects: Card[];
    craftedItems: Item[];
    readonly faction: Faction;
    constructor();
    addItem(item: Item): void;
    setOutcast(game: Game, outcast: Suit, hated?: boolean): void;
    placeWarriors(game: Game, clearing: number, warriors: number, threadId: string): void;
    buildGarden(game: Game, clearing: number, threadId: string): void;
}
