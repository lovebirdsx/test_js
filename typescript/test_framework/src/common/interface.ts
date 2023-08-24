export interface ITran {
    send(data: unknown): void;
    recv(): unknown;
    recvAsync(timeout?: number): Promise<unknown>;
}
