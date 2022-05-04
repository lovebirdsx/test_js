import { IEntity, IPos, ISize } from './entity';
import { EntityStateManager } from './entity_state_manager';

const gridLen = 100;

const gridSize: ISize = { w: gridLen, h: gridLen };
const mananger = new EntityStateManager(gridSize);

const gridCount = 4;

const mapSize: ISize = { w: gridSize.w * gridCount, h: gridSize.h * gridCount };

const entityCount = gridCount * gridCount * 4;

function randomPos(): IPos {
    return {
        x: Math.floor(Math.random() * mapSize.w),
        y: Math.floor(Math.random() * mapSize.h),
    };
}

function main() {
    const entities: IEntity[] = [];
    for (let i = 0; i < entityCount; i++) {
        const entity: IEntity = {
            id: i.toString(),
            pos: randomPos(),
        };

        mananger.addEntity(entity);
        entities.push(entity);
    }

    console.log(mananger.toString());

    const entity = entities[0];
    const from = entity.pos;
    const to = randomPos();
    mananger.updateEntityPos(entities[0], to);

    console.log();
    console.log(`after move entity 0 from ${JSON.stringify(from)} to ${JSON.stringify(to)}`);
    console.log(mananger.toString());
}

main();
