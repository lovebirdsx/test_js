import { ESmActionInfo, ISmActionInfo } from '../interface/sm_action_info';
import { IRole } from './interface';

export function excuteSmAction(action: ISmActionInfo, role?: IRole) {
    switch (action.type) {
        case ESmActionInfo.输出日志:
            console.log(action.message);
            break;
        case ESmActionInfo.释放技能:
            if (!role) {
                throw new Error('执行动作 释放技能 失败: no role');
            }
            role.castSkill(action.skill);
            break;
        case ESmActionInfo.添加Buff:
            if (!role) {
                throw new Error('执行动作 添加Buff 失败: no role');
            }
            role.buffManager.addBuff(action.buff);
            break;
        case ESmActionInfo.操作变量:
            if (!role) {
                throw new Error('执行动作 操作变量 失败: no role');
            }
            if (!role.smRunner.varManager) {
                throw new Error('执行动作 操作变量 失败: no varManager');
            }
            role.smRunner.varManager.op(action.id, action.op, action.value);
            break;
        case ESmActionInfo.操作白条:
            if (!role) {
                throw new Error('执行动作 操作白条 失败: no role');
            }
            role.opWhiteBar(action.op, action.value);
            break;
        default:
            console.error('unknown action');
            break;
    }
}

export function isSmActionFinished(action: ISmActionInfo, role?: IRole) {
    switch (action.type) {
        case ESmActionInfo.释放技能:
            if (!role) {
                throw new Error('excute action CastSkill failed: no role');
            }
            return role.skillManager.isFinished(action.skill);
        default:
            return true;
    }
}
