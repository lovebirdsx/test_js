/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
namespace actions {
    type PrintActionParam = {
        content: string;
    }
    type ActionParams<Params> = {
        actorId: number;
        actionName: string;
        params: Params;
    }

    class Action {
        // execute()
    }

    class ActionExecutor {
        runOne<Params>(params: ActionParams<Params>) {
        }
    }

    class Actor {
        excutor = new ActionExecutor();
    }
}
