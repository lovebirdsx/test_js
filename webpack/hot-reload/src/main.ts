let handle: NodeJS.Timeout;

async function init() {
    const { getVersion } = await import('./lib');
    handle = setInterval(() => {
        console.log(`Version: ${getVersion()}`);
    }, 1000);
}

function stop() {
    clearInterval(handle);
}

function main() {
    init();

    if (module.hot) {
        module.hot.accept('./lib', async () => {
            stop();
            await init();
        });
    }
}

main();
