type Context<T> = {
    value: T,
}

export interface Foo {
    name: string;
    id: number;
}

function createContext<T>(t: T): Context<T> {
    return {
        value: t,
    };
}

const fooContext = createContext<Foo>(undefined as any);
fooContext.value = { name: 'lovebird', id: 100 };
