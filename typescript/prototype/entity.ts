/* eslint-disable no-use-before-define */

module entity {
    abstract class ComponentBase {
        actor: Actor | undefined;
        onAdd(actor: Actor): void {
            this.actor = actor;
        }
    }

    class Actor {
        components = new Map<string, ComponentBase>();
        constructor(
            public name: string,
        ) {}

        onBeginPlay(): void {
            this.components.forEach((value) => value.onAdd(this));
        }

        getCompont<Component extends ComponentBase>(type: { new(): Component}) : Component {
            const com = this.components.get(type.name);
            if (com) {
                return com as Component;
            }
            throw new Error(`No component for ${type.name}`);
        }

        addComponent<Component extends ComponentBase>(com: Component) {
            this.components.set(com.constructor.name, com);
            com.onAdd(this);
        }
    }

    abstract class Entity extends Actor {
        onInteractive(player: Player) { }
    }

    class Player extends Entity {
        static instance: Player;

        constructor(name: string) {
            super(name);
            Player.instance = this;
        }
    }

    interface Triggerable {
        onTrigger(who: Entity) : void;
    }

    class ActionTriggerEntity extends Entity implements Triggerable {
        constructor(name: string) {
            super(name);
            this.addComponent(new ActionExecutor());
            this.addComponent(new Trigger());
        }

        onTrigger(): void {
            const executer = this.getCompont(ActionExecutor);
            executer.excute();
        }

        onBeginPlay(): void {
            super.onBeginPlay();

            const trigger = this.getCompont(Trigger);
            trigger.addListener(this);
        }
    }

    class Trigger extends ComponentBase {
        triggerables = new Array<Triggerable>(0);
        addListener(triggerable: Triggerable) {
            this.triggerables.push(triggerable);
        }

        remListener(triggerable: Triggerable) {
            const index = this.triggerables.indexOf(triggerable);
            if (index > 0) {
                this.triggerables.splice(index, 1);
            }
        }

        trigger(who: Entity) {
            console.log(`${this.actor?.name} is triggered by ${who.name}`);
            this.triggerables.every((triggerable) => triggerable.onTrigger(who));
        }
    }

    class ActionExecutor extends ComponentBase {
        actions = '';

        setActions(actions: string) {
            this.actions = actions;
        }

        excute() {
            console.log(this.actor?.name, this.actions);
        }
    }

    const player = new Player('lovebird');
    const triggerEntity = new ActionTriggerEntity('trigger');
    const excutor = triggerEntity.getCompont(ActionExecutor);
    excutor.setActions('show dialog');

    triggerEntity.onBeginPlay();

    const triggerComponent = triggerEntity.getCompont(Trigger);
    triggerComponent.trigger(player);
}
