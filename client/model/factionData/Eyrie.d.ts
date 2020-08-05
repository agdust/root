import Leader from '../Leader';
import Faction from '../Faction';
import Game from '../Game';
import { Card } from '../Card';
import { Item } from '../Item';
declare type Decree = {
    recruit: Card[];
    move: Card[];
    battle: Card[];
    build: Card[];
};
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
    readonly faction: Faction;
    constructor();
    addItem(item: Item): void;
    setLeader(game: Game, leader: Leader, threadId: string): void;
    placeWarriors(game: Game, clearing: number, warriors: number, threadId: string): void;
    buildRoost(game: Game, clearingIndex: number, threadId: string): void;
}
export {};
