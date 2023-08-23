import { indentToStr } from '../common/misc';
import { ILevel } from '../interface/level';
import { Entity } from './entity';

export class Level implements ILevel {
    id: number;
    name: string;
    entities: Entity[];

    constructor(l: ILevel) {
        this.entities = l.entities.map((e) => new Entity(e));
        this.id = l.id;
        this.name = l.name;
    }

    addEntity(e: Entity): void {
        this.entities.push(e);
    }

    removeEntity(e: Entity): void {
        const index = this.entities.indexOf(e);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    toString(indent?: number): string {
        const result = [];
        result.push(`${indentToStr(indent)}Level ${this.name} ${this.id}`);
        result.push(`${indentToStr(indent)}Entities:`);
        this.entities.forEach((e) => {
            result.push(e.toString((indent || 0) + 1));
        });
        return result.join('\n');
    }
}
