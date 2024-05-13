export function waitUntil(predicate: () => boolean) {
    return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
            if (predicate()) {
                clearInterval(interval);
                resolve();
            }
        }, 1);
    });
}

export function wait(time: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
