interface ServcieIdentifier<T> {
    (...args: any[]): void;
    type: T;
}

namespace util {
    export const serviceIds = new Map<string, ServcieIdentifier<any>>();

    export const DI_TARGET = 'DI_TARGET';
    export const DI_DEPENDENCIES = 'DI_DEPENDENCIES';

    export function getServiceDependencies(ctor: any): { id: ServcieIdentifier<any>, index: number }[] {
        return ctor[DI_DEPENDENCIES] || [];
    }
}

function storeServiceDependency(id: Function, target: Function, index: number): void {
    if ((target as any)[util.DI_TARGET] === target) {
        (target as any)[util.DI_DEPENDENCIES].push({ id, index });
    } else {
        (target as any)[util.DI_DEPENDENCIES] = [{ id, index }];
        (target as any)[util.DI_TARGET] = target;
    }
}

function createDecorator<T>(serviceId: string): ServcieIdentifier<T> {
    if (util.serviceIds.has(serviceId)) {
        return util.serviceIds.get(serviceId)!;
    }

    const id = <any> function id(target: any, key: string, index: number): any {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }
        storeServiceDependency(id, target, index);
    };

    util.serviceIds.set(serviceId, id);
    return id;
}

export const ID = 'logger';

export interface ILogger {
    log(message: string): void;
}

export const ILogger = createDecorator<ILogger>(ID);

export interface IFileSystem {
    readFile(path: string): string;
}

export const IFileSystem = createDecorator<IFileSystem>('IFileSystem');

export class SyncDescriptor<T> {
    constructor(
        readonly ctor: { new(...args: any[]): T },
        readonly staticArguments: any[],
        readonly supportsDelayedInstantiation: boolean,
        ) {
    }
}

const _registry: [ServcieIdentifier<any>, SyncDescriptor<any>][] = [];

export function registerSingleton<T>(id: ServcieIdentifier<T>, ctor: { new(...args: any[]): T }, supportsDelayedInstantiation: boolean): void {
    _registry.push([id, new SyncDescriptor(ctor, [], supportsDelayedInstantiation)]);
}

export function getSingletonServiceDescriptors(): [ServcieIdentifier<any>, SyncDescriptor<any>][] {
    return _registry;
}
