import { ESmActionInfo, ISmActionInfo } from '../interface/sm_action_info';
import { IRole } from './interface';

export function excuteSmAction(action: ISmActionInfo, role?: IRole) {
    switch (action.type) {
        case ESmActionInfo.Log:
            console.log(action.message);
            break;
        case ESmActionInfo.CastSkill:
            if (!role) {
                throw new Error('excute action CastSkill failed: no role');
            }
            role.castSkill(action.skill);
            break;
        case ESmActionInfo.AddBuff:
            console.log(`add buff: ${action.buff}`);
            break;
        default:
            console.error('unknown action');
            break;
    }
}

export function isSmActionFinished(action: ISmActionInfo, role?: IRole) {
    switch (action.type) {
        case ESmActionInfo.CastSkill:
            if (!role) {
                throw new Error('excute action CastSkill failed: no role');
            }
            return role.skillManager.isFinished(action.skill);
        default:
            return true;
    }
}
