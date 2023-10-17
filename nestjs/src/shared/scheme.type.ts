import { SchemaTypeOptions } from 'mongoose';

type SchemeConstructor<T> = T extends string ? StringConstructor : T extends number ? NumberConstructor : any;

type SchemeField<T> = SchemaTypeOptions<T> | SchemeConstructor<T>;

// 将 interface 转换为 mongoose 的 schema
export type InterfaceToSchema<T> = {
  [K in keyof T]?: SchemeField<T[K]>;
} & { _id?: SchemeField<any> };
