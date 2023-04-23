import { IRole, IWorld } from './interface';

export class World implements IWorld {
    // eslint-disable-next-line no-use-before-define
    private static mInstance: World;
    static get instance() {
        if (this.mInstance === undefined) {
            this.mInstance = new World();
        }
        return this.mInstance;
    }

    private roles: IRole[] = [];

    addRole(role: IRole) {
        this.roles.push(role);
    }

    removeRole(role: IRole) {
        const idx = this.roles.indexOf(role);
        if (idx !== -1) {
            this.roles.splice(idx, 1);
        }
    }

    findTarget(role: IRole) {
        return this.roles.find((r) => r.camp !== role.camp);
    }
}
