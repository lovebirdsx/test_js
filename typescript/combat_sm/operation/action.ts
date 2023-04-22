import { EActionInfo, IActionInfo } from '../interface/action_info';

export function excuteAction(action: IActionInfo) {
    switch (action.type) {
        case EActionInfo.Log:
            console.log(action.message);
            break;
        case EActionInfo.CastSkill:
            console.log(`cast skill: ${action.skill}`);
            break;
        case EActionInfo.AddBuff:
            console.log(`add buff: ${action.buff}`);
            break;
        default:
            console.error('unknown action');
            break;
    }
}
