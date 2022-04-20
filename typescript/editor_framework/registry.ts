import { IScheme, Render } from './scheme/define';
import { DataType } from './type/action';

class Registry {
    private readonly shemeMap = new Map<DataType, IScheme>();
    private readonly renderMap = new Map<DataType, Render>();

    regType<T, M=unknown, PT=unknown>(type: DataType, scheme: Omit<IScheme<T, M, PT>, 'type'>, render: Render<T, M, PT>) {
        const newScheme: IScheme<T, M, PT> = {
            ...scheme,
            type,
        };
        this.shemeMap.set(type, newScheme as IScheme);
        this.renderMap.set(type, render as Render);
    }

    getScheme<T, M=unknown, PT=unknown>(type: DataType): IScheme<T, M, PT> {
        const result = this.shemeMap.get(type);
        if (!result) {
            throw new Error(`No sheme for type [${type}]`);
        }
        return result as IScheme<T, M, PT>;
    }

    getRender<T, M=unknown, PT=unknown>(type: DataType): Render<T, M, PT> {
        const result = this.renderMap.get(type);
        if (!result) {
            throw new Error(`No render for type [${type}]`);
        }
        return result as Render<T, M, PT>;
    }
}

export const registry = new Registry();
