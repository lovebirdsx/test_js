declare interface AiApi {
    moveTo(entity: number, pos: { x: number; y: number; z: number }): Promise<void>;
    wait(time: number): Promise<void>;
    log(fmt: string, ...args: unknown[]): void;
    waitCondition(condition: () => boolean): Promise<void>;
}

declare const enum AiEvent {
    Initialized = "initialized",
    Updated = "updated",
}

declare interface Ai {
    name: string;
    [AiEvent.Initialized]: (api: AiApi) => Promise<void>;
    [AiEvent.Updated]: (api: AiApi) => Promise<void>;
}
