//#region literal

type EventName<T extends string> = `${T}Changed`;
type T0 = EventName<'foo'>

type Trim<S extends string> = S extends `${infer T} ` ? Trim<T> :
    S extends ` ${infer T}` ? Trim<T> : S;
type T10 = Trim<' hello'>
type T11 = Trim<' hello  '>
type T2 = `${'top' | 'donw'}-${'left' | 'right'}`;

type StringDashString = `${string}-${string}`
type StringDashNumber = `${string}-${number}`

const sds: StringDashString = 'hello-world';
const sdn: StringDashNumber = 'hello-88';

//#endregion

//#region String format

type PlaceHolder<T extends string> =  T extends `${string}{${infer P}}${infer R}` ? P | PlaceHolder<R> : never;
declare function format<S extends string>(template: S, args: Record<PlaceHolder<S>, unknown>): string;

let text = format('Name: {name}, Age: {age}', {name: 'lovebird', age: '18'});

//#endregion

//#region Routing

type RoutingParamName<T extends string> =
    T extends `${string}/:${infer P}/${infer R}` ? P | RoutingParamName<R> : 
    T extends `${string}:${infer P}` ? P : never;

declare function handleGet<R extends string>(route: R, handle: (params: Record<RoutingParamName<R>, string>) => void): void;
handleGet('/posts/:postId/:commentId', params => {
    if (params.commentId) {
        //
    }
    if (params.postId) {
        //
    }
})

//#endregion

//#region Dotted Paths

type SubKeys<T, K extends string> = K extends keyof T ? `${K}.${PathKeys<T[K]>}` : never;

type PathKeys<T> = object extends T ? string :
    T extends readonly any[] ? Extract<keyof T, `${number}`> | SubKeys<T, Extract<keyof T, `${number}`>> :
    T extends object ? Extract<keyof T, string> | SubKeys<T, Extract<keyof T, string>>:
    never;

type PropType<T, Path extends string> =
    Path extends keyof T ? T[Path]:
    Path extends `${infer K}.${infer R}` ? K extends keyof T ? PropType<T[K], R> : unknown :
    unknown;

declare function getProp<T, P extends PathKeys<T>>(obj: T, path: P): PropType<T, P>;

const obj = {
    name: 'John',
    age: 42,
    cars: [
        { make: 'Ford', age: 10 },
        { make: 'Trabant', age: 35 },
    ]
} as const;

const cars = [
    { make: 'Ford', age: 10 },
    { make: 'Trabant', age: 35 },
] as const

const age = getProp(obj, 'age');
const car0Name = getProp(obj, 'cars.0.make');
const car1Name = getProp(cars, '0.make')

//#endregion

//#region Mapped type 'as' clauses

type OnPropChangeMethods<T> = {
    [P in keyof T & string as `${P}Changed`]: (cb: (newValue: T[P]) => void) => void;
}

declare function makeWatchedObject<T>(obj: T): T & OnPropChangeMethods<T>;

let homer = makeWatchedObject({
    firstName: 'Hommer',
    age: 42,
})

//#endregion
