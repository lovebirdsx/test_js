class TestAsyncBasic {
    async delay(ms: number): Promise<unknown> {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }

    async run() {
        for (let i = 0; i < 10; i++) {
            console.log('delay', i);
            if (i % 2 === 0) {
                await this.delay(1000);
            } else {
                this.delay(1000);
            }
        }
    }

    runInstantly() {
        for (let i = 0; i < 10; i++) {
            console.log('instant', i);
            this.delay(1000);
        }
    }
}

const testAsysncBasic = new TestAsyncBasic();
testAsysncBasic.run().then(() => {
    console.log('finished');
});
testAsysncBasic.runInstantly();
