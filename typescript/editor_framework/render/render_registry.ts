import {
    getSchemeClass,
 Obj, Scheme, SchemeClass,
} from '../scheme/define';
import { Render } from './define';

class RenderRegistry {
    private readonly renderByClass = new Map<SchemeClass, Render>();
    private readonly renderByScheme = new Map<Scheme, Render>();

    regObjectRender<TData, TScheme extends Scheme<TData> = Scheme<TData>>(
        scheme: TScheme,
        render: Render<TData, TScheme>,
    ) {
        this.renderByScheme.set(scheme, render as Render);
    }

    regRenderByClass<TData, TScheme extends Scheme<TData> = Scheme<TData>>(
        schemeClass: new () => TScheme,
        render: Render<TData, TScheme>,
    ) {
        this.renderByClass.set(schemeClass, render as Render);
    }

    getObjectRender<TData extends Obj, TScheme extends Scheme<TData> = Scheme<TData>>(
        scheme: TScheme,
    ): Render<TData, TScheme> {
        const result = this.renderByScheme.get(scheme);
        if (!result) {
            throw new Error(`No render for action scheme [${scheme.name}]`);
        }
        return result as Render<TData, TScheme>;
    }

    private getRenderByClass<TData, TScheme extends Scheme<TData> = Scheme<TData>>(
        schemeClass: new () => TScheme,
    ): Render<TData, TScheme> {
        const result = this.renderByClass.get(schemeClass);
        if (!result) {
            throw new Error(`No render for scheme class [${schemeClass.name}]`);
        }
        return result as Render<TData, TScheme>;
    }

    getRender(scheme: Scheme): Render {
        const render = this.renderByScheme.get(scheme);
        if (render) {
            return render;
        }

        const schemeClass = getSchemeClass(scheme);
        return this.getRenderByClass(schemeClass);
    }
}

export const renderRegistry = new RenderRegistry();
