import { readJsonObj, writeJson } from './util';

function fillDefault<T>(data: T, defaultData: T) {
    for (const key in defaultData) {
        const value = data[key];
        const defaultValue = defaultData[key];
        if (value === undefined) {
            data[key] = defaultValue;
        } else if (typeof defaultValue === 'object') {
            if (typeof value !== 'object') {
                data[key] = defaultValue;
            } else if (!(defaultValue instanceof Array)) {
                fillDefault(value, defaultValue);
            }
        }
    }
}

export class JsonConfig<T> {
    data: T;

    path: string;

    // eslint-disable-next-line no-unused-vars
    constructor(public name: string, public defaultData: T) {}

    async init() {
        const path = await window.electronAPI.getSavePath(this.name);
        this.path = `${path}.json`;
        this.data = await readJsonObj(this.path, this.defaultData);
        if (this.data !== this.defaultData) {
            fillDefault(this.data, this.defaultData);
        }
    }

    get<TKey extends keyof T>(key: TKey): T[TKey] {
        return this.data[key];
    }

    async set<TKey extends keyof T>(key: TKey, value: T[TKey]) {
        this.data[key] = value;
        await this.save();
    }

    async setField<TKey extends keyof T>(key: TKey, fieldKey: string, fieldValue: unknown) {
        const data = this.data[key] as unknown as Record<string, unknown>;
        if (data[fieldKey] !== fieldValue) {
            data[fieldKey] = fieldValue;
            await this.set(key, data as unknown as T[TKey]);
        }
    }

    reset(): void {
        Object.assign(this.data, this.defaultData);
        this.save();
    }

    protected async save() {
        await writeJson(this.data, this.path);
    }
}
