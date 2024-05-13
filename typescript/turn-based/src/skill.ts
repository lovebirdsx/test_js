import { Action, AddSheildAction, DamageAction } from "./action";
import { waitUntil } from "./async";
import { Entity } from "./entity";

export abstract class Skill {
    constructor(protected owner: Entity, protected target: Entity) {}
    abstract execute(): void;
    abstract isFinished(): boolean;
}

export class Skill1 extends Skill {
    private actions: Action[] = [];
    private state: 'idle' | 'running' | 'finished' = 'idle';
    
    constructor(owner: Entity, target: Entity) {
        super(owner, target);
        this.actions.push(new DamageAction(this.owner, this.target, 10));
        this.actions.push(new DamageAction(this.owner, this.target, 20));
        this.actions.push(new DamageAction(this.owner, this.target, 30));
        this.actions.push(new AddSheildAction(this.owner, 5));
    }

    async execute() {
        if (this.state !== 'idle') {
            return;
        }

        this.state = 'running';
        for (const action of this.actions) {
            action.execute();
            await waitUntil(() => action.isFinished());
        }
        this.state = 'finished';
    }

    isFinished() {
        return this.state === 'finished';
    }
}
