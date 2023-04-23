import { yellow } from '../common/color';
import { logT } from '../common/log';
import {
 ESkillAction, ESkillTarget, IAddBuffActionInfo, IDamageActionInfo, IPlayAnimationActionInfo, IRecoverHpActionInfo, IRemoveBuffActionInfo, ISkillActionInfo, ISkillInfo,
} from '../interface/skill_info';
import { GameLoop } from './game_loop';
import {
 IRole, ISkill, ISkillMananger,
} from './interface';

interface ISkillAction {
    execute(target?: IRole): void;
    update(): boolean;
}

abstract class SkillActionBase implements ISkillAction {
    abstract execute(target: IRole): void;

    update(): boolean {
        return true;
    }
}

export class AddBuffSkillAction extends SkillActionBase {
    constructor(public config: IAddBuffActionInfo, public owner: IRole) {
        super();
    }

    execute(target: IRole) {
        this.config.buffIds.forEach((buffId) => {
            target.buffManager.addBuff(buffId);
        });
    }
}

export class RemoveBuffSkillAction extends SkillActionBase {
    constructor(public config: IRemoveBuffActionInfo, public owner: IRole) {
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

    constructor(public config: IPlayAnimationActionInfo, public owner: IRole) {
        super();
    }

    execute(target: IRole) {
        this.startTime = GameLoop.instance.time;
    }

    update(): boolean {
        return GameLoop.instance.time - this.startTime >= this.config.duration;
    }
}

export class DamageSkillAciton extends SkillActionBase {
    constructor(public config: IDamageActionInfo, public role: IRole) {
        super();
    }

    execute(target: IRole) {
        target.takeDamage(this.role, this.config.damageRate * this.role.attack);
    }
}

export class RecoverHpSkillAction extends SkillActionBase {
    constructor(public config: IRecoverHpActionInfo, public owner: IRole) {
        super();
    }

    execute(target: IRole) {
        target.recoverHp(this.config.hpRate * target.maxHp);
    }
}

export class SkillActionFactory {
    static create(config: ISkillActionInfo, role: IRole): ISkillAction {
        switch (config.type) {
            case ESkillAction.加Buff:
                return new AddBuffSkillAction(config, role);
            case ESkillAction.减Buff:
                return new RemoveBuffSkillAction(config, role);
            case ESkillAction.播放动画:
                return new PlayAnimationSkillAction(config, role);
            case ESkillAction.造成伤害:
                return new DamageSkillAciton(config, role);
            case ESkillAction.回复生命:
                return new RecoverHpSkillAction(config, role);
            default:
                throw new Error(`Unknown skill action type: ${config}`);
        }
    }
}

function getTarget(skill: ISkill): IRole | undefined {
    switch (skill.targetType) {
        case ESkillTarget.自己:
            return skill.owner;
        case ESkillTarget.敌方:
            return skill.owner.world.findTarget(skill.owner);
        default:
            throw new Error(`Unknown target type: ${skill.targetType}`);
    }
}

export class Skill implements ISkill {
    private readonly actions: ISkillAction[];
    private currentActionIndex: number = -1;
    private targetRole?: IRole;

    constructor(public config: ISkillInfo, public owner: IRole) {
        this.actions = config.actions.map((action) => SkillActionFactory.create(action, owner));
    }

    get id() {
        return this.config.id;
    }

    get targetType() {
        return this.config.target;
    }

    get finished() {
        return this.currentActionIndex >= this.actions.length;
    }

    async waitFinished() {
        await GameLoop.instance.waitCondition(() => this.finished);
    }

    cast(): void {
        this.targetRole = getTarget(this);
        if (!this.targetRole) {
            logT(`${yellow(this.owner.id)} 使用技能 ${yellow(this.config.id)} 但找不到目标`);
        } else if (this.owner === this.targetRole) {
            logT(`${yellow(this.owner.id)} 对自己使用技能 ${yellow(this.config.id)} `);
        } else {
            logT(`${yellow(this.owner.id)} 朝 ${yellow(this.targetRole.id)} 使用技能 ${yellow(this.config.id)} `);
        }
    }

    update() {
        if (this.actions.length <= 0) {
            return true;
        }

        if (!this.targetRole) {
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

    constructor(public role: IRole) {}

    cast(skill: ISkill): void {
        if (this.isCasting) {
            throw new Error(`Role ${this.role.id} is casting skill ${this.skills[0].id}`);
        }

        this.skills.push(skill);
        skill.cast();
    }

    get isCasting() {
        return this.skills.length > 0;
    }

    isFinished(skillId: string) {
        const skill = this.skills.find((s) => s.id === skillId);
        return skill ? skill.finished : true;
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
