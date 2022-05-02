export interface IPos {
    x: number;
    y: number;
}

export interface ISize {
    w: number;
    h: number;
}

export interface IGrid extends IPos, ISize {

}

export function isPosInGrid(pos: IPos, grid: IGrid) {
    return pos.x >= grid.x && pos.y >= grid.y && pos.x < grid.x + grid.w && pos.y < grid.y + grid.h;
}

export function calGridPos(pos: IPos, gridSize: ISize): IPos {
    const x = Math.floor(pos.x / gridSize.w);
    const y = Math.floor(pos.y / gridSize.h);
    return { x, y };
}

export function calGridHash(gridPos: IPos): string {
    return `${gridPos.x}-${gridPos.y}`;
}

export function isPosEqual(pos1: IPos, pos2: IPos) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

export interface IEntity {
    id: string;
    pos: IPos;
}
