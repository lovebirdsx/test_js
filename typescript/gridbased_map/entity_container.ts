import { IEntity } from './entity';

export class EntityContainer {
    entities: IEntity[] = [];
    entityMap = new Map<string, IEntity>();
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    add(entity: IEntity) {
        if (this.entityMap.has(entity.id)) {
            throw new Error(`Entity ${entity.id} already in container ${this.name}`);
        }
        this.entities.push(entity);
        this.entityMap.set(entity.id, entity);
    }

    remove(entity: IEntity) {
        if (!this.entityMap.has(entity.id)) {
            throw new Error(`Entity ${entity.id} not in container ${this.name}`);
        }
    }

    toString() {
        const ids = this.entities.map((entity) => entity.id);
        return ids.join(', ');
    }
}
