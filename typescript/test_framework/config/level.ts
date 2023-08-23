import { ILevel } from '../src/interface/level';

const levels: ILevel[] = [
    {
        id: 1,
        name: 'Level 1',
        entities: [
            { id: 1, name: 'Entity 1', pos: { x: 0, y: 0 } },
            { id: 2, name: 'Entity 2', pos: { x: 0, y: 0 } },
            { id: 3, name: 'Entity 3', pos: { x: 0, y: 0 } },
        ],
    },
    {
        id: 2,
        name: 'Level 2',
        entities: [
            { id: 1, name: 'Entity 1', pos: { x: 0, y: 0 } },
            { id: 2, name: 'Entity 2', pos: { x: 0, y: 0 } },
            { id: 3, name: 'Entity 3', pos: { x: 0, y: 0 } },
        ],
    },
];

export function getLevelConfig(id: number): ILevel {
    const level = levels.find((l) => l.id === id);
    if (!level) {
        throw new Error(`Level ${id} not found`);
    }

    return level;
}
