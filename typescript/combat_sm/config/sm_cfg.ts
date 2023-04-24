import { ESmActionInfo, ISmActionInfo, checkAction } from '../interface/sm_action_info';
import { ISmRunnerInfo, ISmInfo, IStateInfo } from '../interface/sm_info';
import { bossSmRunnerInfo } from './sm/sm_boss';
import { normalSmRunnerInfo } from './sm/sm_normal';
import { simpleSmRunnerInfo } from './sm/sm_simple';

export const smRunnerInfos: ISmRunnerInfo[] = [
    simpleSmRunnerInfo,
    normalSmRunnerInfo,
    bossSmRunnerInfo,
];

export function getSmRunnerInfo(id: string): ISmRunnerInfo {
    for (const smRunnerInfo of smRunnerInfos) {
        if (smRunnerInfo.id === id) {
            return smRunnerInfo;
        }
    }

    throw new Error(`找不到id为${id}的状态机`);
}

function getSmInfo(runner: ISmRunnerInfo, smId: string): ISmInfo | undefined {
    for (const sm of runner.sms) {
        if (sm.id === smId) {
            return sm;
        }
    }
    return undefined;
}

function getStateInfo(sm: ISmInfo, stateId: string): IStateInfo | undefined {
    for (const state of sm.states) {
        if (state.id === stateId) {
            return state;
        }
    }
    return undefined;
}

function checkSmActions(runner: ISmRunnerInfo, actions: ISmActionInfo[]) {
    actions.forEach((action) => {
        checkAction(action);
        if (action.type === ESmActionInfo.操作变量) {
            if (!runner.vars || runner.vars.find((v) => v.id === action.id) === undefined) {
                throw new Error(`${runner.id} 变量不存在 ${action.id}`);
            }
        }
    });
}

function checkConfigs() {
    for (const runner of smRunnerInfos) {
        if (runner.triggers) {
            for (const trigger of runner.triggers) {
                checkSmActions(runner, trigger.actions);
            }
        }

        for (const sm of runner.sms) {
            for (const state of sm.states) {
                // 检查状态机是否存在
                if (state.innerSm) {
                    const innerSm = getSmInfo(runner, state.innerSm);
                    if (!innerSm) {
                        throw new Error(`${runner.id} ${sm.id} 状态机不存在 ${state.innerSm}`);
                    }
                }
                // 过渡的状态是否存在
                if (state.transitions) {
                    for (const transition of state.transitions) {
                        if (transition.target) {
                            const targetState = getStateInfo(sm, transition.target);
                            if (!targetState) {
                                throw new Error(`${runner.id} ${sm.id} 状态不存在 ${transition.target}`);
                            }
                        }
                    }
                }
            }
        }
    }

    // 检查Action是否合法
    for (const runner of smRunnerInfos) {
        for (const sm of runner.sms) {
            for (const state of sm.states) {
                if (state.enterActions) {
                    checkSmActions(runner, state.enterActions);
                }
                if (state.exitActions) {
                    checkSmActions(runner, state.exitActions);
                }
            }
        }
    }
}

checkConfigs();
