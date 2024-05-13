import { Performer } from "./performer";
import { wait } from "./async";
import { EventDispacher } from "./event-dispatcher";

const eventDefine = {
    onDamaged: undefined as unknown as (who: Entity, damage: number) => void,
    onSheildAdded: undefined as unknown as (sheild: number) => void,
}

export class Entity extends EventDispacher<keyof typeof eventDefine, typeof eventDefine> {
    constructor(public name: string) {
        super();
    }

    takeDamage(who: Entity, damage: number): void {
        console.log(`${this.name} took ${damage} damage!`)
        this.dispatch('onDamaged', who, damage);
    }

    addSheild(sheild: number): void {
        console.log(`${this.name} got ${sheild} sheild!`)
        this.dispatch('onSheildAdded', sheild);
    }
}

export class EntityView {
    constructor(private entity: Entity) {
        entity.reg('onDamaged', this.onDamaged.bind(this));
        entity.reg('onSheildAdded', this.onSheildAdded.bind(this));
    }

    onDamaged(who: Entity, damage: number) {
        Performer.instance.run(async () => {
            console.log(`${this.entity.name} onDamaged(${damage}, ${who.name}) start`);
            await wait(1000);
            console.log(`${this.entity.name} onDamaged(${damage}, ${who.name}) end`);
        });
    }

    onSheildAdded(sheild: number) {
        Performer.instance.run(async () => {
            console.log(`${this.entity.name} onSheildAdded(${sheild}) start`);
            await wait(1000);
            console.log(`${this.entity.name} onSheildAdded(${sheild}) end`);
        });
    }
}