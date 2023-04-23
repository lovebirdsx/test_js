import { EventDispatcher } from "./event_dispatcher";

export interface IGameObj {
    update(): boolean;
}

export interface IGameLoopInfo {
    fps: number;
}

const gameLoopConfig: IGameLoopInfo = {
    fps: 30,
};

const eventDefine = {
    objAdded: (obj: IGameObj) => {},
    objRemoved: (obj: IGameObj) => {},
}

export class GameLoop extends EventDispatcher<typeof eventDefine>{
    private static mInstance: GameLoop;
    static get instance() {
        if (this.mInstance === undefined) {
            this.mInstance = new GameLoop(gameLoopConfig);
        }
        return this.mInstance;
    }


    private objs: IGameObj[] = [];
    private objsToAdd: IGameObj[] = [];
    private objsToRemove: IGameObj[] = [];
    private mTime = 0;
    private mIsRunning = false;

    constructor(private config: IGameLoopInfo) {
        super();
    }

    get time() {
        return this.mTime;
    }

    get isRunning() {
        return this.mIsRunning;
    }

    start() {
        this.mIsRunning = true;
    }

    stop() {
        this.mIsRunning = false;
    }
    
    addObj(obj: IGameObj) {
        this.objsToAdd.push(obj);
    }

    removeObj(obj: IGameObj) {
        this.objsToRemove.push(obj);
    }

    update() {
        if (!this.mIsRunning) {
            return;
        }
        
        if (this.objsToAdd.length > 0) {
            const objsToAdd = this.objsToAdd;
            this.objsToAdd = [];
            for (const obj of objsToAdd) {
                this.objs.push(obj);
                this.dispatch('objAdded', obj);
            }
        }

        if (this.objsToRemove.length > 0) {
            const objsToRemove = this.objsToRemove;
            this.objsToRemove = [];
            for (const obj of objsToRemove) {
                const index = this.objs.indexOf(obj);
                if (index >= 0) {
                    this.objs.splice(index, 1);
                    this.dispatch('objRemoved', obj);
                }
            }
        }

        this.mTime += 1 / this.config.fps;

        for (let i = this.objs.length - 1; i >= 0; i--) {
            const obj = this.objs[i];
            if (obj.update()) {
                this.removeObj(obj);
            }
        }
    }
}