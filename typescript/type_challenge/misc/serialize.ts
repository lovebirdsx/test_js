type Serialize<T> = {[K in keyof T]: T[K] | undefined | null }

const a = { foo: 123, bar: 'hello' };
const b: Serialize<typeof a> = { foo: undefined, bar: null };
