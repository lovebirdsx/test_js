import { IVector } from '../action';

export class Entity {
    moveHandle: number | undefined;
    talkHandle: number | undefined;

    moveTo(pos: IVector, finishCb: () => void) {
        console.log('entity move to', pos);
        this.moveHandle = setTimeout(() => {
            console.log('entity move finished');
            finishCb();
        }, 1000) as unknown as number;
    }

    stopMove() {
        if (this.moveHandle !== undefined) {
            console.log('entity move stopped by user');
            clearTimeout(this.moveHandle);
            this.moveHandle = undefined;
        }
    }

    showTalk(finishCb: () => void) {
        console.log('entity show talk start');
        this.moveHandle = setTimeout(() => {
            console.log('entity show talk finished');
            finishCb();
        }, 1000) as unknown as number;
    }
}
