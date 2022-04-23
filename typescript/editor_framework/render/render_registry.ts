import {
 Scheme, SchemeClass, ObjectScheme, ArrayScheme,
} from '../scheme/define';
import { DynamicActionScheme } from '../scheme/dynamic_action';
import { IAction } from '../type/action';
import { Render } from './define';

class RenderRegistry {
    private readonly renderClassMap = new Map<SchemeClass, Render>();

    regRender<TData, TScheme extends Scheme<TData> = Scheme<TData>>(schemeClass: new() => TScheme, render: Render<TData, TScheme>) {
        this.renderClassMap.set(schemeClass, render as Render);
    }

    regArrayRender<TData>(schemeClass: new() => ArrayScheme<TData>, render: Render<TData[], ArrayScheme<TData>>) {
        this.regRender(schemeClass, render as Render);
    }

    regObjRender<TData>(schemeClass: new() => ObjectScheme<TData>, render: Render<TData, ObjectScheme<TData>>) {
        this.regRender(schemeClass, render as Render);
    }

    regDynamicActionRender(schemeClass: new() => DynamicActionScheme, render: Render<IAction, DynamicActionScheme>) {
        this.regRender(schemeClass, render as Render);
    }

    getRender<TData, TScheme extends Scheme<TData> = Scheme<TData>>(
        schemeClass: new() => TScheme,
    ): Render<TData, TScheme> {
        const result = this.renderClassMap.get(schemeClass);
        if (!result) {
            throw new Error(`No render for type [${schemeClass.name}]`);
        }
        return result as Render<TData, TScheme>;
    }
}

export const renderRegistry = new RenderRegistry();
