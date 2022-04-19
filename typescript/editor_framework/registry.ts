import { IMeta, IScheme, Render } from './scheme/define';
import { ValueType } from './type/action';

class Registry {
    private readonly shemeMap = new Map<ValueType, IScheme<unknown, IMeta>>();
    private readonly renderMap = new Map<ValueType, Render<unknown, IMeta>>();

    regType<T, M=IMeta>(type: ValueType, scheme: Omit<IScheme<T, M>, 'type'>, render: Render<T, M>) {
        const newScheme = {
            ...scheme,
            type,
        };
        this.shemeMap.set(type, newScheme);
        this.renderMap.set(type, render as Render<unknown, IMeta>);
    }

    getScheme<T, M=IMeta>(type: ValueType): IScheme<T, M> {
        return this.shemeMap.get(type) as IScheme<T, M>;
    }

    getRender<T, M=IMeta>(type: ValueType): Render<T, M> {
        return this.renderMap.get(type) as Render<T, M>;
    }
}

export const registry = new Registry();
