import { Piece } from '../Piece';
import Game from '../Game';
export default class ForestZone {
    index: number;
    x: number;
    y: number;
    clearings: number[];
    pieces: Piece[];
    constructor(index: number, x: number, y: number, clearings: number[]);
    addPiece(game: Game, piece: Piece): void;
}
