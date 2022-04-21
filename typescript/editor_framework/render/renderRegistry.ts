import {
 Scheme, IMeta, SchemeClass, IObjMeta, ObjectScheme, ArrayScheme, IArrayMeta,
} from '../scheme/define';
import { ActionScheme, IActionMeta } from '../scheme/dynamic';
import { IAction } from '../type/action';
import { Render } from './define';

class RenderRegistry {
    private readonly renderClassMap = new Map<SchemeClass, Render>();

    regRender<TData>(schemeClass: SchemeClass<TData>, render: Render<TData>) {
        this.renderClassMap.set(schemeClass, render as Render);
    }

    regArrayRender<TData>(schemeClass: new() => ArrayScheme<TData>, render: Render<TData[], IArrayMeta, unknown, ArrayScheme<TData>>) {
        this.regRender(schemeClass, render as Render);
    }

    regObjRender<TData>(schemeClass: new() => ObjectScheme<TData>, render: Render<TData, IObjMeta, unknown, ObjectScheme<TData>>) {
        this.regRender(schemeClass, render as Render);
    }

    regActionRender(schemaClass: new() => ActionScheme, render: Render<IAction, IActionMeta, unknown, ActionScheme>) {
        this.regRender(schemaClass, render as Render);
    }

    getRender<TData, TMeta = unknown, TParent = unknown, TScheme extends Scheme<TData, TMeta, TParent> = Scheme<TData, TMeta, TParent>>(
        schemaClass: new() => TScheme,
    ): Render<TData, TMeta, TParent, TScheme> {
        const result = this.renderClassMap.get(schemaClass);
        if (!result) {
            throw new Error(`No render for type [${schemaClass.name}]`);
        }
        return result as Render<TData, TMeta, TParent, TScheme>;
    }
}

export const renderRegistry = new RenderRegistry();
