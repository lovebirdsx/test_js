const ai2: Ai = {
    name: 'AI2',
    [AiEvent.Initialized]: async (api) => {
        await api.wait(10);
        api.log('AI2 initialized');
    },
    [AiEvent.Updated]: async (api) => {
        await api.moveTo(2, { x: 0, y: 0, z: 0 });
        await api.wait(1000);
        await api.moveTo(2, { x: 0, y: 0, z: 0 });
        await api.wait(1000);
        api.log('AI2 finished');
    }
}

export default ai2;
