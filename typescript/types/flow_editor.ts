type ActionElement = 'DefaultAction' | 'ShowTalkAction';
type ParamElement = 'DefaultAction' | 'ShowTalkAction';
type ParamType = 'text' | 'int' | 'string' | 'float'

type ParamScheme<T> = {
    type: ParamType,
    element: ParamElement,
    formater : (value: string) => T,
}

type ActionScheme1<T extends {[key: string]: any}> = {
    name: string;
    element: ActionElement;
    check: (t: T) => boolean;
    params: {
        [K in keyof T]: ParamScheme<T[K]>;
    }
};

interface LogAction {
    content: string
    id: number
}

const textParamScheme : ParamScheme<string> = {
    type: 'string',
    element: 'DefaultAction',
    formater(value: string): string {
        return value;
    },
};

const intParamScheme : ParamScheme<number> = {
    type: 'int',
    element: 'DefaultAction',
    formater(value: string): number {
        return parseInt(value, 10);
    },
};

const logActionScheme: ActionScheme1<LogAction> = {
    params: {
        content: textParamScheme,
        id: intParamScheme,
    },
    name: 'log',
    element: 'DefaultAction',
    check(t: LogAction) {
        return true;
    },
};
