import { error } from 'console';
import { IBuffInfo } from '../interface/buff_info';
import { IBuff, IBuffManager, IRole } from './interface';
import { GameLoop } from './game_loop';
import { getBuffInfo } from '../config/buff_cfg';

export class Buff implements IBuff {
    private mDuration: number = 0;
    private startTime: number = 0;

    constructor(public config: IBuffInfo, public role: IRole) {
    }

    get id(): string {
        return this.config.id;
    }

    get maxDuration(): number {
        return this.config.duration;
    }

    get duration(): number {
        return this.mDuration;
    }

    onAdd() {
        this.startTime = GameLoop.instance.time;
        this.mDuration = 0;
        for (const state of this.config.states) {
            this.role.stateManager.add(state);
        }
    }

    onRemove() {
        for (const state of this.config.states) {
            this.role.stateManager.remove(state);
        }
    }

    update() {
        this.mDuration = GameLoop.instance.time - this.startTime;
        return this.mDuration >= this.maxDuration;
    }
}

export class BuffManager implements IBuffManager {
    private readonly buffMap: Map<string, Buff> = new Map();
    private buffToAdd: string[] = [];
    private buffToRemove: string[] = [];

    constructor(public role: IRole) {}

    addBuff(buffId: string) {
        this.buffToAdd.push(buffId);
    }

    removeBuff(buffId: string) {
        this.buffToRemove.push(buffId);
    }

    removeBuffInternal(buffId: string) {
        const buff = this.buffMap.get(buffId);
        if (!buff) {
            error(`remove buff ${buffId} failed, buff not found`);
            return;
        }

        this.buffMap.delete(buffId);
        buff.onRemove();
    }

    update() {
        for (const buff of this.buffMap.values()) {
            if (buff.update()) {
                this.removeBuff(buff.id);
            }
        }

        if (this.buffToRemove.length > 0) {
            for (const buffId of this.buffToRemove) {
                this.removeBuffInternal(buffId);
            }
            this.buffToRemove = [];
        }

        if (this.buffToAdd.length > 0) {
            for (const buffId of this.buffToAdd) {
                this.addBuffInternal(buffId);
            }
            this.buffToAdd = [];
        }

        return false;
    }

    private addBuffInternal(buffId: string) {
        const buff = new Buff(getBuffInfo(buffId), this.role);
        this.buffMap.set(buff.config.id, buff);
        buff.onAdd();
    }
}
