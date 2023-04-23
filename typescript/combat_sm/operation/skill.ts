import { logT } from '../common/log';
import {
 ESkillAction, IAddBuffActionInfo, IDamageActionInfo, IPlayAnimationActionInfo, IRemoveBuffActionInfo, ISkillActionInfo, ISkillInfo,
} from '../interface/skill_info';
import { GameLoop } from './game_loop';
import { IRole, ISkill, ISkillMananger } from './interface';

interface ISkillAction {
    execute(target: IRole): void;
    update(): boolean;
}

abstract class SkillActionBase implements ISkillAction {
    public abstract execute(target: IRole): void;

    public update(): boolean {
        return true;
    }
}

export class AddBuffSkillAction extends SkillActionBase {
    public constructor(public config: IAddBuffActionInfo, public owner: IRole) {
        super();
    }

    public execute(target: IRole) {
        this.config.buffIds.forEach((buffId) => {
            target.buffManager.addBuff(buffId);
        });
    }
}

export class RemoveBuffSkillAction extends SkillActionBase {
    public constructor(public config: IRemoveBuffActionInfo, public owner: IRole) {
        super();
    }

    public execute(target: IRole) {
        this.config.buffIds.forEach((buffId) => {
            target.buffManager.removeBuff(buffId);
        });
    }
}

export class PlayAnimationSkillAction extends SkillActionBase {
    private startTime: number = 0;

    public constructor(public config: IPlayAnimationActionInfo, public owner: IRole) {
        super();
    }

    public execute(target: IRole) {
        logT(`Play animation: ${this.config.animationId}`);
        this.startTime = GameLoop.instance.time;
    }

    public update(): boolean {
        return GameLoop.instance.time - this.startTime >= this.config.duration;
    }
}

export class DamageSkillAciton extends SkillActionBase {
    public constructor(public config: IDamageActionInfo, public role: IRole) {
        super();
    }

    public execute(target: IRole) {
        target.takeDamage(this.config.damage);
    }
}

export class SkillActionFactory {
    public static create(config: ISkillActionInfo, role: IRole): ISkillAction {
        switch (config.type) {
            case ESkillAction.加Buff:
                return new AddBuffSkillAction(config, role);
            case ESkillAction.减Buff:
                return new RemoveBuffSkillAction(config, role);
            case ESkillAction.播放动画:
                return new PlayAnimationSkillAction(config, role);
            case ESkillAction.造成伤害:
                return new DamageSkillAciton(config, role);
            default:
                throw new Error(`Unknown skill action type: ${config}`);
        }
    }
}

export class Skill implements ISkill {
    private actions: ISkillAction[];
    public constructor(public config: ISkillInfo, public owner: IRole) {
        this.actions = config.actions.map((action) => SkillActionFactory.create(action, owner));
    }

    public cast() {
    }
}

export class SkillManager implements ISkillMananger {
    public constructor(public role: IRole) {}

    cast(skill: ISkill): void {

    }
}
