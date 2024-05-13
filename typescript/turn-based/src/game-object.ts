import { Entity, EntityView } from "./entity";

export class GameObject {
    entity: Entity;
    view: EntityView;

    constructor(public name: string) {
        this.entity = new Entity(name);
        this.view = new EntityView(this.entity);
    }
}