import {
 Filter, ObjectScheme as ObjScheme, ObjectSchemeClass as ObjSchemeClass, Scheme, SchemeClass,
} from './define';

class SchemeRegistry {
    private readonly objSchemeMap = new Map<ObjSchemeClass, ObjScheme>();
    private readonly objSchemeClasses = [] as ObjSchemeClass[];
    private readonly objSchemeClassFilterMap = new Map<Filter, ObjSchemeClass[]>();

    regObjScheme(objSchemaClass: ObjSchemeClass) {
        if (this.objSchemeClassFilterMap.size > 0) {
            throw new Error(
                `Can not reg objscheme for ${objSchemaClass.name} while parsed`,
            );
        }

        // eslint-disable-next-line new-cap
        const objScheme = new objSchemaClass();
        this.objSchemeClasses.push(objSchemaClass);
        this.objSchemeMap.set(objSchemaClass, objScheme);
    }

    private parseAllObjSchemes() {
        this.objSchemeClasses.forEach((schemeClass) => {
            const scheme = this.getObjScheme(schemeClass);
            scheme.meta.filters.forEach((filter) => {
                let schemas = this.objSchemeClassFilterMap.get(filter);
                if (!schemas) {
                    schemas = [];
                    this.objSchemeClassFilterMap.set(filter, schemas);
                }
                schemas.push(schemeClass);
            });
        });
    }

    getObjSchemClassesByFilter(filter: Filter): ObjSchemeClass[] {
        if (this.objSchemeClassFilterMap.size <= 0) {
            this.parseAllObjSchemes();
        }

        const result = this.objSchemeClassFilterMap.get(filter);
        if (!result) {
            return [];
        }

        return result;
    }

    getObjScheme(schemeClass: ObjSchemeClass): ObjScheme {
        const result = this.objSchemeMap.get(schemeClass);
        if (!result) {
            throw new Error(`No sheme for type [${schemeClass.name}]`);
        }

        return result;
    }
}

export const schemeRegistry = new SchemeRegistry();
