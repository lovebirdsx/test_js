import { logT } from '../common/log';
import { IStateInfo, ISmInfo, ISmRunnerInfo } from '../interface/sm_info';
import { excuteSmAction as executeSmAction, isSmActionFinished } from './sm_action';
import { Transition } from './transition';
import { green, red, yellow } from '../common/color';
import {
 EUpdateResult, IGameObj, IRole, ISm, ISmRunner,
} from './interface';

export class State {
    private readonly sm?: ISm;
    private transitions: Transition[] = [];
    private currentEnterActionIndex = -1;
    private isEnterActionFinished = false;

    constructor(public config: IStateInfo, public runner: ISmRunner, public parent?: ISm) {
        if (config.innerSm) {
            this.sm = this.runner.spawn(config.innerSm.id, parent);
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
        this.transitions = this.config.transitions.map((transition) => new Transition(transition));

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
            if (smResult === EUpdateResult.Running && this.config.innerSm?.pending) {
                return [EUpdateResult.Running];
            }
        }

        if (!this.isEnterActionFinished) {
            return [EUpdateResult.Running];
        }

        for (const transition of this.transitions) {
            if (transition.isOk(this.runner.role)) {
                if (this.sm && smResult !== EUpdateResult.Finished) {
                    logT(`${yellow(this.runner.role?.id || '')} ${red('中断状态')}: ${green(this.sm?.id ?? '')} - ${yellow(this.id)}`);
                }
                return [EUpdateResult.Finished, transition.target];
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

        logT(`${yellow(this.runner.role?.id || '')} 进入状态: ${green(this.id)} ${green(this.currentState.id)}`);
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

export class SmRunner implements ISmRunner, IGameObj {
    private readonly rootSm: ISm;
    private mRole?: IRole;
    private mPaused: boolean = false;

    constructor(public config: ISmRunnerInfo) {
        this.rootSm = this.spawn(this.config.root);
    }

    get name() {
        return 'SmRunner';
    }

    get role() {
        return this.mRole;
    }

    set role(role: IRole | undefined) {
        this.mRole = role;
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
