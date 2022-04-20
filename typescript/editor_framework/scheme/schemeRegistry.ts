import { DataType } from '../type/action';
import {
 Filter, IObjectScheme, IObjMeta, IScheme, Obj,
} from './define';

class SchemeRegistry {
    private readonly schemeByType = new Map<DataType, IScheme>();
    private readonly typeByScheme = new Map<IScheme, DataType>();
    private readonly objectSchemes = [] as IObjectScheme [];
    private readonly objectFilterMap = new Map<Filter, DataType[]>();

    regScheme<TData, TMeta = unknown, TParent = unknown>(
        schemeType: DataType,
        scheme: IScheme<TData, TMeta, TParent>,
    ) {
        const exist = this.schemeByType.get(schemeType);
        if (exist) {
            throw new Error(`reg duplicate scheme ${schemeType}`);
        }
        this.schemeByType.set(schemeType, scheme as IScheme);
        this.typeByScheme.set(scheme as IScheme, schemeType);
    }

    regObjScheme<TData extends Obj, TMeta extends IObjMeta, TParent>(
        schemeType: DataType,
        schema: IObjectScheme<TData, TMeta, TParent>,
    ) {
        if (this.objectFilterMap.size > 0) {
            throw new Error(`Can not reg objscheme for ${schemeType} while parsed`);
        }

        this.objectSchemes.push(schema as IObjectScheme);
        this.regScheme(schemeType, schema);
    }

    private parseAllObjSchemes() {
        this.objectSchemes.forEach((scheme) => {
            const typeName = this.typeByScheme.get(scheme);
            if (!typeName) {
                throw new Error(`No type name for ${scheme}`);
            }
            scheme.meta.filters.forEach((filter) => {
                let names = this.objectFilterMap.get(filter);
                if (!names) {
                    names = [];
                    this.objectFilterMap.set(filter, names);
                }
                names.push(typeName);
            });
        });
    }

    getObjTypesByFilter(filter: Filter): DataType[] {
        if (this.objectFilterMap.size <= 0) {
            this.parseAllObjSchemes();
        }

        let result = this.objectFilterMap.get(filter);
        if (!result) {
            result = [];
        }

        return result;
    }

    getScheme<TData, TMeta = unknown, TParent = unknown, TScheme extends IScheme<TData, TMeta, TParent> = IScheme<TData, TMeta, TParent>>(schemeType: DataType): IScheme<TData, TMeta, TParent> {
        const result = this.schemeByType.get(schemeType);
        if (!result) {
            throw new Error(`No sheme for type [${schemeType}]`);
        }

        return result as TScheme;
    }
}

export const schemeRegistry = new SchemeRegistry();
