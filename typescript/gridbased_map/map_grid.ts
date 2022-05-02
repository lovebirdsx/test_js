import { IGrid, IPos, isPosInGrid } from './entity';
import { EntityContainer } from './entity_container';

export class Grid implements IGrid {
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;

    constructor(grid: IGrid) {
        this.x = grid.x;
        this.y = grid.y;
        this.w = grid.w;
        this.h = grid.h;
    }

    contains(pos: IPos) {
        return isPosInGrid(pos, this);
    }
}

export class GridEntityManager {
    readonly grid: Grid;
    readonly container: EntityContainer;

    constructor(grid: IGrid) {
        this.grid = new Grid(grid);
        this.container = new EntityContainer(`${grid.x}-${grid.y}`);
    }

    toString() {
        return this.container.toString();
    }

    save(dir: string) {

    }

    load(dir: string) {

    }
}
