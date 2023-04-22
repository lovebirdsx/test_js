import { IActionInfo, EActionInfo } from '../interface/action_info';
import { IConditionInfo, ECondition } from '../interface/condition_info';

export function cWait(duration: number): IConditionInfo {
    return {
        type: ECondition.TimePassed,
        duration,
    };
}

export function aLog(message: string): IActionInfo {
    return {
        type: EActionInfo.Log,
        message,
    };
}

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function listToMap<T extends { id: string }>(list: T[]): Map<string, T> {
    const map = new Map<string, T>();
    for (const item of list) {
        map.set(item.id, item);
    }
    return map;
}
