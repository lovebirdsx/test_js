interface IEntity {
    name: string;
}

export abstract class Component {
    entity: IEntity | undefined = undefined;

    get name(): string {
        return this.entity?.name || 'undefined';
    }

    onInit(): void {}

    onStart(): void {}

    onDestroy(): void {}
}

export type ComponentClass = new () => Component;

type TClass<T> = new (...args: unknown[]) => T;

export class Entity implements IEntity {
    protected myComponents: Component[] = [];

    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    get components(): Component[] {
        return this.myComponents;
    }

    addComponent(component: Component): void {
        this.myComponents.push(component);
        component.entity = this;
    }

    addComponentC<T extends Component>(classObj: TClass<T>): T {
        // eslint-disable-next-line new-cap
        const component = new classObj();
        this.addComponent(component);
        return component;
    }

    getComponent<T extends Component>(classObj: TClass<T>): T {
        for (const component of this.myComponents) {
            if (component instanceof classObj) {
                return component;
            }
        }
        throw new Error(`Component ${classObj.name} not found on Entity ${this.constructor.name}`);
    }

    removeComponent<T extends Component>(classObj: TClass<T>): void {
        for (let i = this.myComponents.length - 1; i >= 0; i--) {
            const component = this.myComponents[i];
            if (component instanceof classObj) {
                component.entity = undefined;
                this.myComponents.splice(i, 1);
                break;
            }
        }
    }

    hasComponent<T extends Component>(classObj: TClass<T>): boolean {
        for (const component of this.myComponents) {
            if (component instanceof classObj) {
                return true;
            }
        }

        return false;
    }

    init(): void {
        this.myComponents.forEach((c) => {
            if (c.onInit) {
                c.onInit();
            }
        });
    }

    start(): void {
        this.myComponents.forEach((c) => {
            if (c.onStart) {
                c.onStart();
            }
        });
    }

    destroy(): void {
        this.myComponents.forEach((c) => {
            if (c.onDestroy) {
                c.onDestroy();
            }
        });
    }
}
