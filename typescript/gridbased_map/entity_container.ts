import { IEntity } from './entity';

export class EntityContainer {
    private entities: IEntity[] = [];
    private entityMap = new Map<string, IEntity>();
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    get isEmpty() {
        return this.entities.length <= 0;
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
        this.entities.splice(this.entities.indexOf(entity), 1);
        this.entityMap.delete(entity.id);
    }

    toString() {
        const ids = this.entities.map((entity) => entity.id);
        return ids.join(', ');
    }
}
