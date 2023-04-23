import { log } from 'console';
import { logT } from '../common/log';
import {
 ESkillAction, ESkillTarget, IAddBuffActionInfo, IDamageActionInfo, IPlayAnimationActionInfo, IRemoveBuffActionInfo, ISkillActionInfo, ISkillInfo,
} from '../interface/skill_info';
import { GameLoop } from './game_loop';
import {
 IRole, ISkill, ISkillMananger, IWorld,
} from './interface';

interface ISkillAction {
    execute(target?: IRole): void;
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
        target.takeDamage(this.role, this.config.damage);
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

function getTarget(skill: ISkill): IRole | undefined {
    switch (skill.target) {
        case ESkillTarget.自己:
            return skill.owner;
        case ESkillTarget.敌方:
            return skill.owner.world.findTarget(skill.owner);
        default:
            throw new Error(`Unknown target type: ${skill.target}`);
    }
}

export class Skill implements ISkill {
    private readonly actions: ISkillAction[];
    private currentActionIndex: number = -1;
    private targetRole?: IRole;

    public constructor(public config: ISkillInfo, public owner: IRole) {
        this.actions = config.actions.map((action) => SkillActionFactory.create(action, owner));
        this.targetRole = getTarget(this);
    }

    public get target() {
        return this.config.target;
    }

    public get finished() {
        return this.currentActionIndex >= this.actions.length;
    }

    public update() {
        if (this.actions.length <= 0) {
            return true;
        }

        if (this.currentActionIndex < 0) {
            this.currentActionIndex = 0;
            this.actions[this.currentActionIndex].execute(this.targetRole);
        }

        while (this.currentActionIndex < this.actions.length) {
            const action = this.actions[this.currentActionIndex];
            if (action.update()) {
                this.currentActionIndex++;
                if (this.currentActionIndex < this.actions.length) {
                    this.actions[this.currentActionIndex].execute(this.targetRole);
                }
            } else {
                break;
            }
        }

        return this.currentActionIndex >= this.actions.length;
    }
}

export class SkillManager implements ISkillMananger {
    private readonly skills: ISkill[] = [];

    public constructor(public role: IRole) {}

    cast(skill: ISkill): void {
        this.skills.push(skill);
    }

    get isCasting() {
        return this.skills.length > 0;
    }

    update() {
        for (let i = this.skills.length - 1; i >= 0; i--) {
            if (this.skills[i].update()) {
                this.skills.splice(i, 1);
            }
        }

        return false;
    }
}
