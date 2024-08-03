import { Equal, Expect } from './utils';

type Cases = [
    Expect<Equal<string & number, never>>,
    Expect<Equal<string & (number | string), string>>,
]
