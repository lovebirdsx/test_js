interface IVector {
    x: number;
    y: number;
}

type TConditionType = '判断距离' | '是否有Tag';

interface IConditionBase {
    type: TConditionType;
}

interface IDistanceCondition extends IConditionBase {
    type: '判断距离';
    value: number;
}

interface ITagCondition extends IConditionBase {
    type: '是否有Tag';
    value: string;
}

type TConditionOp = '同时满足' | '任意满足';

type TCondition = IDistanceCondition | ITagCondition;

interface IConditionGroup {
    type: TConditionOp;
    conditions: TCondition[];
}

interface ILookAtAction {
    type: 'lookAt';
    target: IVector;
}

type TAction = ILookAtAction;

interface IConditionSlot {
    condition: IConditionGroup;
    actions: TAction[];
}

interface IPreSkillInfo {
    id: number;
    slots: IConditionSlot[];
}

const config: IPreSkillInfo = {
    id: 1,
    slots: [
        {
            condition: {
                type: '同时满足',
                conditions: [
                    { type: '判断距离', value: 10 },
                    { type: '是否有Tag', value: 'enemy' },
                ],
            },
            actions: [
                { type: 'lookAt', target: { x: 1, y: 2 } },
            ],
        },
        {
            condition: {
                type: '同时满足',
                conditions: [
                    { type: '判断距离', value: 10 },
                    { type: '是否有Tag', value: 'enemy' },
                ],
            },
            actions: [
                { type: 'lookAt', target: { x: 1, y: 2 } },
            ],
        },
    ],
};
