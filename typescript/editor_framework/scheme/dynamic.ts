import { IDynamic } from '../type/action';
import {
 Filter, IMeta, Scheme, RenderType,
} from './define';
import { schemeRegistry } from './schemeRegistry';

export interface IDynamicMeta extends IMeta {
    filter: Filter,
}

export abstract class DynamicScheme extends Scheme<IDynamic, IDynamicMeta> {
    abstract meta: IDynamicMeta;

    createDefault(parent: unknown): IDynamic {
        const typeNames = schemeRegistry.getObjSchemsByFilter(this.meta.filter);
            if (typeNames.length <= 0) {
                return undefined as any;
            }

        const objScheme = schemeRegistry.getObjScheme<IDynamic, IDynamicMeta>(typeNames[0]);
        return objScheme.createDefault(undefined);
    }
}

export class NormalDynamicScheme extends DynamicScheme {
    meta: IDynamicMeta = { filter: Filter.normal };
}
