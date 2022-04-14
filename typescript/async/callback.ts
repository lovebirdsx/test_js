function testCallBack() {
    function delay(time: number): Promise<void> {
        return new Promise<void>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, time * 1000);
            }
        );
    }

    async function testDelay() {
        await delay(1);
        console.log(1);
        await delay(1);
        console.log(2);
        await delay(1);
        console.log('finished');
    }

    type Callback<T> = (t: T) => void;
    function waitCallback<T>(setCallback: (resolve: Callback<T>, reject: Callback<T>) => void): Promise<T> {
        return new Promise<T>(
            (resolve1, reject1) => {
                setCallback(resolve1, reject1);
            }
        )
    }

    async function testWaitCallback() {
        let resolve: Callback<void>;
        let reject: Callback<void>;
        setTimeout(() => {
            resolve();
        }, 1000);

        console.log('start wait');
        await waitCallback((resolve0, reject0) => {
            resolve = resolve0;
            reject = reject0;
        });

        console.log('wait finished');
    }

    // testDelay();
    testWaitCallback();
}

testCallBack();
