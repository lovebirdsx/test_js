let time = 0;

export function getTime() {
    return time;
}

export function getTimeStr() {
    return time.toFixed(1);
}

function updateTime(dt: number) {
    time += dt;
}

let timer: any;
export function startTimeSerivce() {
    time = 0;
    timer = setInterval(() => {
        updateTime(0.1);
    }, 1);
}

export function stopTimeService() {
    if (timer === undefined) {
        return;
    }

    clearInterval(timer);
    timer = undefined;
}
