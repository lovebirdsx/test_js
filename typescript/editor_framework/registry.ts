import { IScheme, Render } from './scheme/define';
import { ValueType } from './type/action';

class Registry {
    private readonly shemeMap = new Map<ValueType, IScheme<unknown>>();
    private readonly renderMap = new Map<ValueType, Render<unknown>>();

    regType<T>(type: ValueType, scheme: Omit<IScheme<T>, 'type'>, render: Render<T>) {
        const newScheme = {
            ...scheme,
            type,
        };
        this.shemeMap.set(type, newScheme);
        this.renderMap.set(type, render as Render<unknown>);
    }

    getScheme<T>(type: ValueType): IScheme<T> {
        return this.shemeMap.get(type) as IScheme<T>;
    }

    getRender<T>(type: ValueType): Render<T> {
        return this.renderMap.get(type) as Render<T>;
    }
}

export const registry = new Registry();
