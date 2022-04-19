import { IMeta, IScheme, Render } from './scheme/define';
import { DataType } from './type/action';

class Registry {
    private readonly shemeMap = new Map<DataType, IScheme<unknown, IMeta>>();
    private readonly renderMap = new Map<DataType, Render<unknown, IMeta>>();

    regType<T, M=IMeta>(type: DataType, scheme: Omit<IScheme<T, M>, 'type'>, render: Render<T, M>) {
        const newScheme = {
            ...scheme,
            type,
        };
        this.shemeMap.set(type, newScheme);
        this.renderMap.set(type, render as Render<unknown, IMeta>);
    }

    getScheme<T, M=IMeta>(type: DataType): IScheme<T, M> {
        return this.shemeMap.get(type) as IScheme<T, M>;
    }

    getRender<T, M=IMeta>(type: DataType): Render<T, M> {
        return this.renderMap.get(type) as Render<T, M>;
    }
}

export const registry = new Registry();
