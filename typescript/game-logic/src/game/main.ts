import { join } from 'path';

const aiApi: AiApi = {
    moveTo: async (entity: number, pos: { x: number; y: number; z: number }) => new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log(`Moving entity ${entity} to position`, pos);
            resolve();
        }, 1000);
    }),
    
    wait: (time: number) => new Promise<void>((resolve) => { setTimeout(resolve, time); }),
    
    log: (fmt: string, ...args: unknown[]) => {
        console.log(fmt, ...args);
    },

    waitCondition: async (condition: () => boolean) => {
        while (!condition()) {
            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) => { setTimeout(resolve, 100); });
        }
        console.log('Condition satisfied');
    },
};

async function runAi(ai: Ai, api: AiApi) {
    await ai[AiEvent.Initialized](api);
    await ai[AiEvent.Updated](api);
}

interface Entity {
    id: number;
    name: string;
    ai: string;
}

const entities: Entity[] = [
    { id: 1, name: 'Entity1', ai: 'ai1' } as const,
    { id: 2, name: 'Entity2', ai: 'ai2' } as const,
];

async function createEntity(name: string) {
    const entityData = entities.find((entity) => entity.name === name);
    if (!entityData) {
        throw new Error(`Entity ${name} not found`);
    }

    const { default: ai } = await import(join(__dirname, '..', 'logic', 'ai', entityData.ai));
    runAi(ai, aiApi);
    return entityData;
}

function main() {
    createEntity('Entity1');
    createEntity('Entity2');
}

main();
