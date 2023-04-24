/* eslint-disable object-curly-newline */
import { listToMap } from '../common/util';
import { IRoleInfo, ECamp } from '../interface/role_info';

const roleInfos: IRoleInfo[] = [
    { id: '玩家', maxHp: 100, attack: 20, camp: ECamp.Player, sm: '普通AI' },
    { id: '玩家-简单AI', maxHp: 100, attack: 20, camp: ECamp.Player, sm: '简单AI' },
    { id: '小怪', maxHp: 80, attack: 10, camp: ECamp.Enemy, sm: '普通AI', hasWhiteBar: true },
    { id: '猩猩', maxHp: 500, attack: 20, camp: ECamp.Enemy, sm: '猩猩', hasWhiteBar: true },
];

const roleInfoMap = listToMap(roleInfos);

export function getRoleInfo(id: string): IRoleInfo {
    const roleInfo = roleInfoMap.get(id);
    if (!roleInfo) {
        throw new Error(`roleInfo not found: ${id}`);
    }
    return roleInfo;
}
