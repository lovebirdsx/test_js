import { DataType, IDynamic } from '../type/action';
import {
 Filter, IMeta, IScheme, RenderType,
} from './define';
import { schemeRegistry } from './schemeRegistry';

export interface IDynamicMeta extends IMeta {
    filter: Filter,
}

export type DynamicScheme = IScheme<IDynamic, IDynamicMeta>;

export function createDynamicScheme(meta: IDynamicMeta): DynamicScheme {
    return {
        renderType: RenderType.dynamic,
        createDefault: (): IDynamic => {
            const typeNames = schemeRegistry.getObjTypesByFilter(meta.filter);
            if (typeNames.length <= 0) {
                return undefined as any;
            }

            const objScheme = schemeRegistry.getScheme<IDynamic, IDynamicMeta>(typeNames[0]);
            return objScheme.createDefault(undefined);
        },
        check: () => 0,
        fix: () => 0,
        meta,
    };
}

schemeRegistry.regScheme(DataType.dynamic, createDynamicScheme({ filter: Filter.normal }));
