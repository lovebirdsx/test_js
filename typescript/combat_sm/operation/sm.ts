import { logT } from '../common/log';
import { IStateInfo, ISmInfo, ISmRunnerInfo } from '../interface/state_info';
import { excuteAction } from './action';
import { Transition } from './transition';
import { green, red, yellow } from '../common/color';
import { IGameObj } from './interface';

export const enum EUpdateResult {
    Running,
    Finished,
}

interface ISm {
    id: string;
    update(): EUpdateResult;
}

interface ISmRunner {
    spawn(smId: string, parent?: ISm): ISm;
}

export class State {
    private readonly sm?: ISm;
    private transitions: Transition[] = [];

    constructor(public config: IStateInfo, public runner: ISmRunner, public parent?: ISm) {
        if (config.innerSm) {
            this.sm = this.runner.spawn(config.innerSm.id, parent);
        }
    }

    get id() {
        return this.config.id;
    }

    enter() {
        this.transitions = this.config.transitions.map((transition) => new Transition(transition));
        this.config.enterActions?.forEach((action) => {
            excuteAction(action);
        });
    }

    exit() {
        this.config.exitActions?.forEach((action) => {
            excuteAction(action);
        });
    }

    update(): [EUpdateResult, string?] {
        let smResult: EUpdateResult | undefined;
        if (this.sm) {
            smResult = this.sm.update();
            if (smResult === EUpdateResult.Running && this.config.innerSm?.pending) {
                return [EUpdateResult.Running];
            }
        }

        for (const transition of this.transitions) {
            if (transition.isOk()) {
                if (this.sm && smResult !== EUpdateResult.Finished) {
                    logT(`${red('中断')}: ${green(this.sm?.id ?? '')} - ${yellow(this.id)}`);
                }
                return [EUpdateResult.Finished, transition.target];
            }
        }
        return [EUpdateResult.Running];
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
        if (this.currentState) {
            this.currentState.enter();
            logT(`进入: ${green(this.id)} - ${yellow(this.currentState.id)}`);
        }
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

    constructor(public config: ISmRunnerInfo) {
        this.rootSm = this.spawn(this.config.root);
    }

    get name() {
        return 'SmRunner';
    }

    spawn(smId: string, parent?: ISm): ISm {
        const stateMachinConfig = this.config.sms.find((stateMachine) => stateMachine.id === smId);
        if (!stateMachinConfig) {
            throw new Error('state machine not found');
        }
        return new Sm(stateMachinConfig, this, parent);
    }

    update(): boolean {
        return this.rootSm.update() === EUpdateResult.Finished;
    }
}
