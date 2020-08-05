import { Piece } from '../Piece';
import Clearing from './Clearing';
import ForestZone from './ForestZone';
export default class Board {
    name: string;
    clearings: Clearing[];
    paths: [number, number][];
    rivers: [number, number][];
    forests: ForestZone[];
    scoreTrack: {
        x: number;
        y: number;
    };
    itemSlots: {
        [key: string]: {
            x: number;
            y: number;
        }[];
    };
    constructor(name: string, clearings: Clearing[], paths: [number, number][], rivers: [number, number][], forests: ForestZone[], scoreTrack: {
        x: number;
        y: number;
    });
    locate(piece: Piece): Clearing | undefined;
    adjacentClearings(clearingIndex: number): Clearing[];
    clearingDistance(start: number, end: number): number;
}
