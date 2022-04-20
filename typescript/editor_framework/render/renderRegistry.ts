import { Scheme, IMeta, SchemeClass } from '../scheme/define';
import { Render } from './define';

class RenderRegistry {
    private readonly renderClassMap = new Map<SchemeClass, Render>();
    private readonly renderMap = new Map<Scheme, Render>();

    regRender<
        TData,
        TMeta extends IMeta = IMeta,
        TParent = unknown,
        TScheme extends Scheme<TData, TMeta, TParent> = Scheme<
            TData,
            TMeta,
            TParent
        >
    >(schemeClass: SchemeClass, render: Render<TData, TMeta, TParent, TScheme>) {
        this.renderClassMap.set(schemeClass, render as Render);
        // eslint-disable-next-line new-cap
        const scheme = new schemeClass();
        this.renderMap.set(scheme, render as Render);
    }

    getRender<TData, TMeta = unknown, TParent = unknown>(
        schemaClass: SchemeClass,
    ): Render<TData, TMeta, TParent> {
        const result = this.renderClassMap.get(schemaClass);
        if (!result) {
            throw new Error(`No render for type [${schemaClass.name}]`);
        }
        return result as Render<TData, TMeta, TParent>;
    }
}

export const renderRegistry = new RenderRegistry();
