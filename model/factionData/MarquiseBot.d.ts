import Faction from '../Faction';
import { Card } from '../Card';
import { Item } from '../Item';
export default class MarquiseBot {
    warrior: number;
    orders: Card[];
    victoryPoints: number;
    craftedItems: Item[];
    readonly faction: Faction;
    constructor();
}
