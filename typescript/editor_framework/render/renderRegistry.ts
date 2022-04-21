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

    regArrayRender<TData>(schemeClass: new() => ArrayScheme<TData>, render: Render<TData[], IArrayMeta, ArrayScheme<TData>>) {
        this.regRender(schemeClass, render as Render);
    }

    regObjRender<TData>(schemeClass: new() => ObjectScheme<TData>, render: Render<TData, IObjMeta, ObjectScheme<TData>>) {
        this.regRender(schemeClass, render as Render);
    }

    regActionRender(schemeClass: new() => ActionScheme, render: Render<IAction, IActionMeta, ActionScheme>) {
        this.regRender(schemeClass, render as Render);
    }

    getRender<TData, TMeta = unknown, TParent = unknown, TScheme extends Scheme<TData, TMeta> = Scheme<TData, TMeta>>(
        schemeClass: new() => TScheme,
    ): Render<TData, TMeta, TScheme> {
        const result = this.renderClassMap.get(schemeClass);
        if (!result) {
            throw new Error(`No render for type [${schemeClass.name}]`);
        }
        return result as Render<TData, TMeta, TScheme>;
    }
}

export const renderRegistry = new RenderRegistry();
