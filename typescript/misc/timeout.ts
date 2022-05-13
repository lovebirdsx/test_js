export const MS_PER_SEC = 1000;

export interface ICancleableDelay {
    Promise: Promise<void>;
    IsFinished: () => boolean;
    Cancel: () => void;
}

export function createCancleableDelay(time: number): ICancleableDelay {
    let id: unknown;
    let finished = false;
    let resolveOut: () => void;
    const promise = new Promise<void>((resolve): void => {
        resolveOut = resolve;
        id = setTimeout(() => {
            finished = true;
            resolve();
        }, time * MS_PER_SEC);
    });
    return {
        Promise: promise,
        IsFinished: () => finished,
        Cancel: (): void => {
            if (!finished) {
                clearTimeout(id as number);
                resolveOut();
            }
        },
    };
}

const cancelableDelay: ICancleableDelay = createCancleableDelay(3);
async function runAction() {
    console.log('Before');
    await cancelableDelay.Promise;
    console.log('After');
}

// 取消执行后, After不会输出, 因为CancleableDealy中的resolve在Cancel之后并没有被调用
runAction();
setTimeout(() => {
    cancelableDelay.Cancel();
}, 2 * MS_PER_SEC);
