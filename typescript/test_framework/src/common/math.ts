import { IVector } from '../interface/level';

export class Vector implements IVector {
    x: number = 0;
    y: number = 0;

    constructor(v: IVector) {
        this.x = v.x;
        this.y = v.y;
    }

    assign(v: IVector): void {
        this.x = v.x;
        this.y = v.y;
    }

    add(v: Vector): Vector {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v: Vector): Vector {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
}
