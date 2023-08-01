/* eslint-disable no-underscore-dangle */
// 实体编辑器 父 （子）（被引用）
// 玩法编辑器（父）（被引用） 任务编辑器 子 引用
// 流程编辑器 （父）（子）（引用）

type LogicObj = 'entity' | 'quest' | 'levelplay' | 'flow'

interface ILogicObj {
    _Type: LogicObj;
    _Parent?: string;
    References?: string[];
    Children?: string[];
}

interface IEntityData extends ILogicObj {
    _Type: 'entity';
    Id: number;
}

interface IQuest extends ILogicObj {
    _Type: 'quest';
    Id: number;
}

interface ILevelPlay extends ILogicObj {
    _Type: 'levelplay';
    Id: number;
}

interface IFlowInfo extends ILogicObj {
    _Type: 'flow';
    Id: number;
}

type TLogicObj = IEntityData | IQuest | IFlowInfo | ILevelPlay;

function logicObjToUid(obj: TLogicObj): string {
    switch (obj._Type) {
        case 'entity':
            return `e_{${obj.Id}}`;
        case 'quest':
            return `q_{${obj.Id}}`;
        case 'levelplay':
            return `l_{${obj.Id}}`;
        case 'flow':
            return `f_{${obj.Id}}`;
        default:
            return 'unknown';
    }
}

function getLogicObjByUid(uid: string): TLogicObj {
    const [type, id] = uid.split('_');
    switch (type) {
        case 'e':
            return {
                _Type: 'entity',
                Id: Number(id),
            };
        case 'q':
            return {
                _Type: 'quest',
                Id: Number(id),
            };
        case 'l':
            return {
                _Type: 'levelplay',
                Id: Number(id),
            };
        case 'f':
            return {
                _Type: 'flow',
                Id: Number(id),
            };
        default:
            return {
                _Type: 'entity',
                Id: 0,
            };
    }
}

class LogicObjManager {
    private objMap = new Map<string, TLogicObj>();

    public Register(obj: TLogicObj): void {
    }

    public UnRegister(obj: TLogicObj): void {
    }

    public GetUid(obj: TLogicObj): string {
        return logicObjToUid(obj);
    }

    public GetObjByUid(uid: string): TLogicObj {
        const obj = this.objMap.get(uid);
        if (!obj) {
            throw new Error('not found');
        }
        return obj;
    }
}
