/* eslint-disable no-use-before-define */
namespace actions {

    class ActionParams {

    }

    abstract class Action<Params extends ActionParams> {
        abstract excute(actor: Actor, params: Params): void;
    }

    class PrintParams extends ActionParams { content = ''; }
    class PrintAction extends Action<PrintParams> {
        excute(actor: Actor, params: PrintParams): void {
            console.log(actor.name, params.content);
        }
    }

    class AddParams extends ActionParams { a = 0; b = 0; }
    class AddAction extends Action<AddParams> {
        excute(actor: Actor, params: AddParams): void {
            console.log(actor.name, `${params.a} + ${params.b} = ${params.a + params.b}`);
        }
    }

    class SubParams extends ActionParams { a = 0; b = 0; }
    class SubAction extends Action<SubParams> {
        excute(actor: Actor, params: SubParams): void {
            console.log(actor.name, `${params.a} - ${params.b} = ${params.a - params.b}`);
        }
    }

    type SpwanAction = new() => Action<ActionParams>;
    type SpwanParams = new() => ActionParams;
    class ActionManager {
        actionMap = new Map<string, SpwanAction>();
        constructor() {
            this.register(AddParams, AddAction);
            this.register(PrintParams, PrintAction);
            this.register(SubParams, SubAction);
        }

        register<Params extends ActionParams>(param: SpwanParams, spawn: SpwanAction) {
            console.log('register', param.name);
            this.actionMap.set(param.name, spawn);
        }

        spawn<Params extends ActionParams>(param: string): Action<Params> {
            const actionClass = this.actionMap.get(param);
            if (actionClass) {
                // eslint-disable-next-line new-cap
                const action = new actionClass();
                return action;
            }
            throw new Error(`No action for param ${param}`);
        }
    }

    class ActionExecutor {
        // eslint-disable-next-line no-array-constructor
        private actions = new Array<[string, ActionParams]>();

        constructor(
            public actor: Actor,
        ) {}

        runOne<Params extends ActionParams>(type: string, params: Params) : void {
            const action = actor.actionManager.spawn(type);
            action.excute(actor, params);
        }

        add<Params extends ActionParams>(type: SpwanParams, params: Params) : void {
            this.actions.push([type.name, params]);
        }

        run() {
            for (let i = 0; i < this.actions.length; i++) {
                const [type, params] = this.actions[i];
                this.runOne(type, params);
            }
        }

        info() {
            for (let i = 0; i < this.actions.length; i++) {
                const [type, params] = this.actions[i];
                console.log(type, params);
            }
        }

        serialize(): string {
            return JSON.stringify(this.actions);
        }

        deserialize(str: string) {
            this.actions = JSON.parse(str);
        }
    }

    class Actor {
        excutor = new ActionExecutor(this);

        constructor(
            public readonly id: number,
            public readonly name: string,
            public readonly actionManager: ActionManager,
        ) {}
    }

    const actionManger = new ActionManager();
    const actor = new Actor(1, 'lovebird', actionManger);
    const ex1 = actor.excutor;
    ex1.add(AddParams, { a: 1, b: 2 });
    ex1.add(SubParams, { a: 100, b: 2 });
    ex1.add(PrintParams, { content: 'Hello World' });
    ex1.add(PrintParams, { content: 'Foo bar!' });
    ex1.info();
    ex1.run();

    console.log('=====================================');
    const str = ex1.serialize();
    console.log(str);
    console.log('=====================================');

    const actor2 = new Actor(2, 'foo', actionManger);
    const ex2 = actor2.excutor;
    ex2.deserialize(str);
    ex2.info();
    ex2.run();
}
