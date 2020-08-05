import Faction from '../Faction';
import { Character } from '../Character';
import Game from '../Game';
import { Item } from '../Item';
import { Card } from '../Card';
export default class Vagabond {
    faction: Faction.vagabond | Faction.vagabond2;
    character: string | null;
    items: {
        refreshed: Item[];
        exhausted: Item[];
        damaged: Item[];
    };
    relations: {
        marquise: number | null;
        eyrie: number | null;
        alliance: number | null;
        cult: number | null;
        riverfolk: number | null;
    };
    coalition: string | null;
    ruinItems: Item[];
    hand: Card[];
    craftedEffects: Card[];
    victoryPoints: number;
    constructor(faction: Faction.vagabond | Faction.vagabond2);
    addItem(item: Item): void;
    setCharacter(game: Game, character: Character, threadId: string): void;
}
