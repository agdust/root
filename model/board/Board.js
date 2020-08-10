"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("../Item");
const Piece_1 = require("../Piece");
class Board {
    constructor(name, clearings, paths, rivers, forests, scoreTrack) {
        this.name = name;
        this.clearings = clearings;
        this.paths = paths;
        this.rivers = rivers;
        this.forests = forests;
        this.scoreTrack = scoreTrack;
        const x = 1088;
        const dx = 175;
        const y = [150, 320];
        this.itemSlots = {
            [Item_1.Item.bag]: [{ x, y: y[0] }, { x, y: y[1] }],
            [Item_1.Item.boot]: [{ x: x + dx, y: y[0] }, { x: x + dx, y: y[1] }],
            [Item_1.Item.crossbow]: [{ x: x + 2 * dx, y: y[0] }],
            [Item_1.Item.hammer]: [{ x: x + 2 * dx, y: y[1] }],
            [Item_1.Item.sword]: [{ x: x + 3 * dx, y: y[0] }, { x: x + 3 * dx, y: y[1] }],
            [Item_1.Item.tea]: [{ x: x + 4 * dx, y: y[0] }, { x: x + 4 * dx, y: y[1] }],
            [Item_1.Item.coin]: [{ x: x + 5 * dx, y: y[0] }, { x: x + 5 * dx, y: y[1] }],
        };
    }
    locate(piece) {
        return this.clearings
            .find(clearing => clearing.pieces.some(p => Piece_1.Piece.equals(p, piece))
            || clearing.buildings.some(p => !!p && Piece_1.Piece.equals(p, piece)));
    }
    adjacentClearings(clearingIndex) {
        return this.clearings
            .filter(clearing => this.paths.some(path => path.includes(clearing.index) && path.includes(clearingIndex)))
            .filter(clearing => clearing.index !== clearingIndex);
    }
    clearingDistance(start, end) {
        const visited = this.clearings.map(() => false);
        const distances = this.clearings.map(() => Infinity);
        distances[start] = 0;
        let current = start;
        while (current !== null && current !== end) {
            visited[current] = true;
            const neighbours = [];
            for (const [f, t] of this.paths) {
                if (f === current || t === current) {
                    const other = f === current ? t : f;
                    if (!visited[other]) {
                        neighbours.push(other);
                    }
                }
            }
            for (const neighbour of neighbours) {
                if (distances[current] + 1 < distances[neighbour]) {
                    distances[neighbour] = distances[current] + 1;
                }
            }
            current = distances
                .map((distance, i) => [distance, i])
                .filter((_, i) => !visited[i])
                .reduce((distance, node) => (distance[0] < node[0] ? distance : node), [Infinity, null])[1];
        }
        return distances[end];
    }
}
exports.default = Board;
