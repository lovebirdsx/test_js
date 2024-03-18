const ai1: Ai = {
    name: 'AI1',
    [AiEvent.Initialized]: async (api) => {
        await api.wait(10);
        api.log('AI1 initialized');
    },
    [AiEvent.Updated]: async (api) => {
        await api.moveTo(1, { x: 0, y: 0, z: 0 });
        await api.wait(1000);
        api.log('AI1 finished');
    }
}

export default ai1;
