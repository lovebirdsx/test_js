/* eslint-disable no-void */
import {
 EAction, IActionInfo, ILog, IMoveToPos, IVector, IWait,
} from './action';
import { ActionRunner } from './action_runner';
import { MS_PER_SEC } from './common';
import { Entity } from './entity/entity';

function log(content: string): IActionInfo {
    const log: ILog = { content };
    return {
        type: EAction.Log,
        params: log,
    };
}

function wait(time: number): IActionInfo {
    const wait: IWait = { time };
    return {
        type: EAction.Wait,
        params: wait,
    };
}

function moveToPos(pos: IVector): IActionInfo {
    const moveToPos: IMoveToPos = {
        pos,
    };
    return {
        type: EAction.MoveToPos,
        params: moveToPos,
    };
}

function showTalk(): IActionInfo {
    return {
        type: EAction.ShowTalk,
        params: undefined,
    };
}

const runner = new ActionRunner(
    'Test',
    [
        log('Start'),
        wait(1),
        log('Hello1'),
        wait(0.5),
        showTalk(),
        moveToPos({ x: 10, y: 10 }),
        wait(2),
        log('Hello2'),
        log('End'),
    ],
);

setTimeout(() => {
    console.log('Stop run1');
    runner.Stop();
}, MS_PER_SEC * 2);

setTimeout(() => {
    console.log('Stop run2');
    runner.Stop();
}, MS_PER_SEC * 3);

const entity = new Entity();
runner.Execute(entity);
