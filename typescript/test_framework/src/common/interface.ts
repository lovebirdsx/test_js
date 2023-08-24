export interface ITran {
    isRunning: boolean;
    stop(): void;
    send(data: unknown): void;
    recv(): unknown;
    recvAsync(timeout?: number): Promise<unknown>;
}
