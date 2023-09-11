import { SyncDescriptor } from './descriptors';

export namespace _util {
    export const serviceIds = new Map<string, ServiceIdentifier<any>>();

    export const DI_TARGET = 'DI_TARGET';
    export const DI_DEPENDENCIES = 'DI_DEPENDENCIES';

    export function getServiceDependencies(ctor: any): { id: ServiceIdentifier<any>; index: number; }[] {
        return ctor[DI_DEPENDENCIES] || [];
    }
}

export type BrandedService = { _serviceBrand: undefined };

export interface ServicesAccessor {
    get<T>(id: ServiceIdentifier<T>): T;
}

export type GetLeadingNonServiceArgs<TArgs extends any[]> =
    TArgs extends [] ? []
    : TArgs extends [...infer TFirst, BrandedService] ? GetLeadingNonServiceArgs<TFirst>
    : TArgs;

export interface IInstantiationService {
    readonly _serviceBrand: undefined;

    createInstance<Ctor extends new (...args: any[]) => any, R extends InstanceType<Ctor>>(ctor: Ctor, ...args: GetLeadingNonServiceArgs<ConstructorParameters<Ctor>>): R;

    invokeFunction<R, TS extends any[] = []>(fn: (accessor: ServicesAccessor, ...args: TS) => R, ...args: TS): R;
}

export const IInstantiationService = createDecorator<IInstantiationService>('instantiationService');

export interface ServiceIdentifier<T> {
    (...args: any[]): void;
    type: T;
}

function storeServiceDependency(id: Function, target: Function, index: number): void {
    if ((target as any)[_util.DI_TARGET] === target) {
        (target as any)[_util.DI_DEPENDENCIES].push({ id, index });
    } else {
        (target as any)[_util.DI_DEPENDENCIES] = [{ id, index }];
        (target as any)[_util.DI_TARGET] = target;
    }
}

export function createDecorator<T>(serviceId: string): ServiceIdentifier<T> {
    if (_util.serviceIds.has(serviceId)) {
        return _util.serviceIds.get(serviceId)!;
    }

    const id = <any> function id(target: any, key: string, index: number): any {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }
        storeServiceDependency(id, target, index);
    };

    _util.serviceIds.set(serviceId, id);
    return id;
}

export const _registry: [ServiceIdentifier<any>, SyncDescriptor<any>][] = [];
export function registerSingleton<T>(id: ServiceIdentifier<T>, ctor: { new(...args: any[]): T; }, supportsDelayedInstantiation: boolean): void {
    _registry.push([id, new SyncDescriptor(ctor, [], supportsDelayedInstantiation)]);
}

export function getSingletonServiceDescriptors(): [ServiceIdentifier<any>, SyncDescriptor<any>][] {
    return _registry;
}