import { logT } from '../common/log';
import {
 IStateInfo, ISmInfo, ISmRunnerInfo, ISmTriggerInfo, ESmEvent, ISmVarInfo,
} from '../interface/sm_info';
import { excuteSmAction as executeSmAction, isSmActionFinished } from './sm_action';
import { Transition } from './transition';
import { green, red, yellow } from '../common/color';
import {
 EUpdateResult, IGameObj, IRole, ISm, ISmRunner,
} from './interface';
import { isConditionOk } from './condition';
import { VarMananger } from './var';

export class State {
    private readonly sm?: ISm;
    private transitions: Transition[] = [];
    private currentEnterActionIndex = -1;
    private isEnterActionFinished = false;

    constructor(public config: IStateInfo, public runner: ISmRunner, public parent?: ISm) {
        if (config.innerSm) {
            this.sm = this.runner.spawn(config.innerSm, parent);
        }
    }

    get id() {
        return this.config.id;
    }

    private updateEnterActions() {
        if (this.isEnterActionFinished || !this.config.enterActions) {
            return;
        }

        if (this.currentEnterActionIndex < 0 && this.config.enterActions) {
            this.currentEnterActionIndex = 0;
            executeSmAction(this.config.enterActions[0], this.runner.role);
        }

        while (!this.isEnterActionFinished) {
            const action = this.config.enterActions[this.currentEnterActionIndex];
            if (isSmActionFinished(action, this.runner.role)) {
                this.currentEnterActionIndex++;
                if (this.currentEnterActionIndex >= this.config.enterActions.length) {
                    this.isEnterActionFinished = true;
                    break;
                }

                const nextAction = this.config.enterActions[this.currentEnterActionIndex];
                executeSmAction(nextAction, this.runner.role);
            } else {
                break;
            }
        }
    }

    enter() {
        this.transitions = this.config.transitions?.map((transition) => new Transition(transition)) || [];

        this.currentEnterActionIndex = -1;
        if (!this.config.enterActions || this.config.enterActions.length <= 0) {
            this.isEnterActionFinished = true;
        } else {
            this.isEnterActionFinished = false;
        }

        this.updateEnterActions();
    }

    exit() {
        this.config.exitActions?.forEach((action) => {
            executeSmAction(action, this.runner.role);
        });
    }

    update(): [EUpdateResult, string?] {
        this.updateEnterActions();

        let smResult: EUpdateResult | undefined;
        if (this.sm) {
            smResult = this.sm.update();
        }

        if (!this.isEnterActionFinished) {
            return [EUpdateResult.Running];
        }

        for (const transition of this.transitions) {
            if (transition.isOk(this.runner.role)) {
                if (this.sm) {
                    if (transition.isForce) {
                        if (this.sm && smResult !== EUpdateResult.Finished) {
                            logT(`${yellow(this.runner.role?.id || '')} ${red('中断状态')}: ${green(this.sm.str)}`);
                        }
                        return [EUpdateResult.Finished, transition.target];
                    }

                    if (smResult === EUpdateResult.Finished) {
                        return [EUpdateResult.Finished, transition.target];
                    }
                } else {
                    return [EUpdateResult.Finished, transition.target];
                }
            }
        }

        return this.transitions.length <= 0 ? [EUpdateResult.Finished] : [EUpdateResult.Running];
    }
}

export class Sm implements ISm {
    private states: Map<string, State> = new Map();
    private currentState: State | undefined = undefined;
    private updateCount = 0;

    constructor(public config: ISmInfo, public runner: ISmRunner, public parent?: ISm) {
        this.config.states.forEach((state) => {
            this.addState(new State(state, runner, this));
        });
    }

    get id() {
        return this.parent ? `${this.parent.id}.${this.config.id}` : this.config.id;
    }

    get str() {
        return this.currentState ? `${this.id}.${this.currentState.id}` : this.id;
    }

    private addState(state: State) {
        this.states.set(state.id, state);
    }

    private setState(stateName?: string) {
        if (this.currentState) {
            this.currentState.exit();
        }

        if (!stateName) {
            this.currentState = undefined;
            return;
        }

        this.currentState = this.states.get(stateName);
        if (!this.currentState) {
            throw new Error(`${this.id} 不存在状态 ${stateName}`);
        }

        logT(`${yellow(this.runner.role?.id || '')} 进入状态: ${green(this.str)}`);
        this.currentState.enter();
    }

    update() {
        this.updateCount++;
        if (this.updateCount === 1) {
            if (this.config.states.length <= 0) {
                throw new Error('state machine has no state');
            }

            this.setState(this.config.states[0].id);
        }

        if (this.currentState) {
            const [result, target] = this.currentState.update();
            if (result === EUpdateResult.Finished) {
                this.setState(target);
            }
        }

        return this.currentState ? EUpdateResult.Running : EUpdateResult.Finished;
    }
}

class Trigger {
    private role?: IRole;
    constructor(private config: ISmTriggerInfo) {
    }

    private readonly onTrigger = () => {
        if (!this.role) {
            throw new Error('trigger role is not binded');
        }

        if (!this.config.condition || isConditionOk(this.config.condition, this.role)) {
            this.config.actions.forEach((action) => {
                executeSmAction(action, this.role);
            });
            if (this.config.oneshot) {
                this.unBind(this.role);
            }
        }
    };

    private setBind(role: IRole, isBinded: boolean) {
        this.role = role;
        switch (this.config.when) {
            case ESmEvent.受到攻击:
                role.event.setReg('Damaged', this.onTrigger, isBinded);
                break;
            default:
                throw new Error(`未知的触发器 ${this.config.when}`);
        }
    }

    bind(role: IRole) {
        this.setBind(role, true);
    }

    unBind(role: IRole) {
        this.setBind(role, false);
    }
}

class TriggerManager {
    private readonly triggers: Trigger[];
    constructor(private triggerInfos: ISmTriggerInfo[], public runner: ISmRunner) {
        this.triggers = triggerInfos.map((triggerInfo) => new Trigger(triggerInfo));
    }

    bind(role: IRole) {
        this.triggers.forEach((trigger) => {
            trigger.bind(role);
        });
    }

    unBind(role: IRole) {
        this.triggers.forEach((trigger) => {
            trigger.unBind(role);
        });
    }
}

export class SmRunner implements ISmRunner, IGameObj {
    private readonly rootSm: ISm;
    private mRole?: IRole;
    private mPaused: boolean = false;
    private readonly triggerManager?: TriggerManager;
    public readonly varManager?: VarMananger;

    constructor(public config: ISmRunnerInfo) {
        this.rootSm = this.spawn(this.config.root);
        if (this.config.triggers) {
            this.triggerManager = new TriggerManager(this.config.triggers, this);
        }
        if (this.config.vars) {
            this.varManager = new VarMananger(this.config.vars, this.config.id);
        }
    }

    get name() {
        return 'SmRunner';
    }

    get role() {
        return this.mRole;
    }

    set role(role: IRole | undefined) {
        if (this.mRole) {
            this.triggerManager?.unBind(this.mRole);
        }
        this.mRole = role;
        if (this.mRole) {
            this.triggerManager?.bind(this.mRole);
        }
    }

    get paused() {
        return this.mPaused;
    }

    set paused(paused: boolean) {
        this.mPaused = paused;
    }

    spawn(smId: string, parent?: ISm): ISm {
        const stateMachinConfig = this.config.sms.find((stateMachine) => stateMachine.id === smId);
        if (!stateMachinConfig) {
            throw new Error(`state machine ${smId} not found`);
        }
        return new Sm(stateMachinConfig, this, parent);
    }

    update(): boolean {
        if (this.paused) {
            return false;
        }
        return this.rootSm.update() === EUpdateResult.Finished;
    }
}
