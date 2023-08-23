import { Vector } from '../common/math';
import { indentToStr } from '../common/misc';
import { IEntity } from '../interface/level';

export class Entity implements IEntity {
    id: number = 0;
    name: string;
    pos: Vector;

    constructor(entity: IEntity) {
        this.id = entity.id;
        this.name = entity.name;
        this.pos = new Vector(entity.pos);
    }

    toString(indent?: number): string {
        return `${indentToStr(indent)}${this.name} ${this.id} at (${this.pos.x}, ${this.pos.y})`;
    }

    moveTo(v: Vector): void {
        this.pos.assign(v);
    }
}
