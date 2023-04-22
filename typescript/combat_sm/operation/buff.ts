import { error } from 'console';
import { getTime } from '../common/time';
import { IBuffInfo, getBuffInfo } from '../interface/buff_info';
import { IBuff, IBuffManager, IRole } from './interface';

export class Buff implements IBuff {
    private mDuration: number = 0;
    private startTime: number = 0;

    public constructor(public config: IBuffInfo, public role: IRole) {
    }

    get id(): string {
        return this.config.id;
    }

    get maxDuration(): number {
        return this.config.maxDuration;
    }

    get duration(): number {
        return this.mDuration;
    }

    onAdd() {
        this.startTime = getTime();
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
        this.mDuration = getTime() - this.startTime;
        return this.mDuration >= this.maxDuration;
    }
}

export class BuffManager implements IBuffManager {
    private readonly buffMap: Map<string, Buff> = new Map();
    private buffToAdd: string[] = [];
    private buffToRemove: string[] = [];

    public constructor(public role: IRole) {}

    public addBuff(buffId: string) {
        this.buffToAdd.push(buffId);
    }

    public removeBuff(buffId: string) {
        this.buffToRemove.push(buffId);
    }

    public removeBuffInternal(buffId: string) {
        const buff = this.buffMap.get(buffId);
        if (!buff) {
            error(`remove buff ${buffId} failed, buff not found`);
            return;
        }

        this.buffMap.delete(buffId);
        buff.onRemove();
    }

    public update() {
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
    }

    private addBuffInternal(buffId: string) {
        const buff = new Buff(getBuffInfo(buffId), this.role);
        this.buffMap.set(buff.config.id, buff);
        buff.onAdd();
    }
}
