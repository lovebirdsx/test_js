import { ISimple, StateEnum } from './simple';

const simple: ISimple = {
    Name: 'lovebird',
    Age: 30,
    state: StateEnum.ON,
    coins: [1, 2, 3],
    snacks: ['foo', 'bar'],
    oldStates: [StateEnum.ON, StateEnum.OFF],
    blobs: [],
    blob: new Uint8Array([1, 2, 3]),
};

const binary = ISimple.encode(simple).finish();
const json = JSON.stringify(simple);

console.log('json length', json.length);
console.log('binary length', binary.length);

const simple2 = ISimple.decode(binary);
console.log(simple2);

// const jsonStr = ISimple.toJSON(simple);
// console.log(JSON.stringify(simple));
// console.log(jsonStr);
// const parsedObj = JSON.parse(jsonStr as string);
// console.log(parsedObj);
