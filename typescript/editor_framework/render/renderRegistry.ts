import { IScheme, IMeta } from '../scheme/define';
import { Render } from './define';

class RenderRegistry {
    private readonly renderMap = new Map<string, Render>();

    regRender<
        TData,
        TMeta extends IMeta = IMeta,
        TParent = unknown,
        TScheme extends IScheme<TData, TMeta, TParent> = IScheme<
            TData,
            TMeta,
            TParent
        >
    >(renderType: string, render: Render<TData, TMeta, TParent, TScheme>) {
        this.renderMap.set(renderType, render as Render);
    }

    getRender<TData, TMeta = unknown, TParent = unknown>(
        renderType: string,
    ): Render<TData, TMeta, TParent> {
        const result = this.renderMap.get(renderType);
        if (!result) {
            throw new Error(`No render for type [${renderType}]`);
        }
        return result as Render<TData, TMeta, TParent>;
    }
}

export const renderRegistry = new RenderRegistry();
