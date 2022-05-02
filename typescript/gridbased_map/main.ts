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
    for (let i = 0; i < entityCount; i++) {
        const entity: IEntity = {
            id: i.toString(),
            pos: randomPos(),
        };

        mananger.addEntity(entity);
    }

    console.log(mananger.toString());
}

main();
