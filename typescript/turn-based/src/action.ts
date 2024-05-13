import { Performer } from "./performer";
import { Entity } from "./entity";

export abstract class Action {
    abstract execute(): void;
    abstract isFinished(): boolean;
}

export abstract class PerformAction {
    isFinished() {
        return !Performer.instance.isPerforming;
    }
}

export class DamageAction extends PerformAction {
    constructor(private caster: Entity, private target: Entity, private damage: number) {
        super();
    }

    execute() {
        this.target.takeDamage(this.caster, this.damage);
    }
}

export class AddSheildAction extends PerformAction {
    constructor(private caster: Entity, private sheild: number) {
        super();
    }

    execute() {
        this.caster.addSheild(this.sheild);
    }
}
