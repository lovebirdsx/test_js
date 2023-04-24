import { listToMap } from '../common/util';
import { ERoleState, IBuffInfo } from '../interface/buff_info';

const buffConfigs: IBuffInfo[] = [
    { id: '无敌3秒', duration: 3, states: [ERoleState.无敌] },
    { id: '瘫痪3秒', duration: 3, states: [ERoleState.瘫痪] },
];

const buffMap = listToMap(buffConfigs);
export function getBuffInfo(buffId: string): IBuffInfo {
    const result = buffMap.get(buffId);
    if (!result) {
        throw new Error(`buff ${buffId} 不存在`);
    }

    return result;
}
