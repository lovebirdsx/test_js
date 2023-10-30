import { SchemaTypeOptions } from 'mongoose';

type SchemeConstructor<T> = T extends string ? StringConstructor : T extends number ? NumberConstructor : any;

type SchemeField<T> = SchemaTypeOptions<T> | SchemeConstructor<T>;

/**
 *  将 interface 转换为 mongoose 的 schema
 */
export type InterfaceToSchema<T> = {
  [K in keyof T]?: SchemeField<T[K]>;
} & { _id?: SchemeField<any> };

/**
 * 从 interface 中提取出所有的 leaf field，不包含对象的路径
 * 例如: type Leaves<{ a: { b: string } }> = 'a.b'
 */
export type Leaves<T> = T extends object
  ? { [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}` }[keyof T]
  : never;

type MongoDoc<T> = T extends object ? { _id: string; __v: string } & { [K in keyof T]: MongoDoc<T[K]> } : T;
/**
 * 从 interface 中提取出所有的 leaf field，不包含对象的路径
 * 例如: type DbLeaves<{ a: { b: string } }> = 'a.b' | '_id' | '__v'
 *
 * 用于 mongoose 的 select 语句
 */
export type DbLeaves<T> = Leaves<MongoDoc<T>>;

/**  从 interface 中提取出所有的 leaf field，包含对象的路径
 * 例如: type Paths<{ a: { b: string } }> = 'a' | 'a.b'
 **/
export type Paths<T> = T extends object
  ? { [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K]>}`}` }[keyof T]
  : never;

export function safeKey<T>(key: keyof T): keyof T {
  return key;
}
