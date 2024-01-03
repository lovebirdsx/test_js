import { Equal, Expect } from "../utils";

type NestedKeys<T> = (T extends object 
  ? { [K in keyof T]: K extends string 
      ? `${K}` | (T[K] extends object ? `${K}.${NestedKeys<T[K]>}` : never) 
      : never 
    }[keyof T] 
  : never) extends infer D ? Extract<D, string> : never;

interface Foo {
  a: string;
  b: {
    c: number;
    d: boolean;
  }
}

type Keys = NestedKeys<Foo>;
type cases = [
  Expect<Equal<Keys, "a" | "b" | "b.c" | "b.d">>
]
