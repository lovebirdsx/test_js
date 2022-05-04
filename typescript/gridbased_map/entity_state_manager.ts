import {
 calGridHash, calGridPos, IEntity, IPos, ISize, isPosEqual,
} from './entity';
import { GridEntityManager } from './map_grid';

export class EntityStateManager {
    readonly gridSize: ISize;
    readonly manangerMap = new Map<string, GridEntityManager>();

    constructor(gridSize: ISize) {
        this.gridSize = gridSize;
    }

    addEntity(entity: IEntity) {
        const gridPos = calGridPos(entity.pos, this.gridSize);
        const hash = calGridHash(gridPos);
        let gem = this.manangerMap.get(hash);
        if (!gem) {
            gem = new GridEntityManager(hash, {
                x: gridPos.x,
                y: gridPos.y,
                w: this.gridSize.w,
                h: this.gridSize.h,
            });
            this.manangerMap.set(hash, gem);
        }

        gem.container.add(entity);
    }

    removeEntity(entity: IEntity) {
        const gridPos = calGridPos(entity.pos, this.gridSize);
        const hash = calGridHash(gridPos);
        const gem = this.manangerMap.get(hash);
        if (!gem) {
            throw new Error(`Can not remove entity ${entity.id} while not add before`);
        }
        gem.container.remove(entity);

        if (gem.container.isEmpty) {
            this.manangerMap.delete(gem.id);
        }
    }

    updateEntityPos(entity: IEntity, newPos: IPos) {
        const oldGridPos = calGridPos(entity.pos, this.gridSize);
        const newGridPos = calGridPos(newPos, this.gridSize);
        if (isPosEqual(oldGridPos, newGridPos)) {
            entity.pos = newPos;
        } else {
            this.removeEntity(entity);
            entity.pos = newPos;
            this.addEntity(entity);
        }
    }

    toString() {
        const result: string[] = [];
        for (const [name, manager] of this.manangerMap) {
            result.push(`${name} ${manager.toString()}`);
        }
        result.sort();
        return result.join('\n');
    }
}
