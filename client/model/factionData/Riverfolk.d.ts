import Faction from '../Faction';
import Game from '../Game';
import { Piece } from '../Piece';
import { Card } from '../Card';
import { Item } from '../Item';
export declare type ServiceCosts = {
    handCard: number;
    riverboats: number;
    mercenaries: number;
};
export default class Riverfolk {
    warrior: number;
    trade_post_fox: number;
    trade_post_rabbit: number;
    trade_post_mouse: number;
    funds: {
        payments: Piece[];
        funds: Piece[];
        commitments: Piece[];
        crafted: {
            fox: Piece[];
            rabbit: Piece[];
            mouse: Piece[];
        };
    };
    services: ServiceCosts;
    hand: Card[];
    victoryPoints: number;
    dominance: Card | null;
    craftedEffects: Card[];
    craftedItems: Item[];
    readonly faction: Faction;
    constructor();
    addItem(item: Item): void;
    placeWarriors(game: Game, clearing: number, count: number | undefined, threadId: string): void;
    takeWarrior(count: number, threadId: string): Piece[];
    setPrices(game: Game, prices: ServiceCosts): void;
    receivePayment(game: Game, ...payment: Piece[]): void;
}
