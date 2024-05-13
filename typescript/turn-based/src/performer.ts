export class Performer {
    private static _instance?: Performer;

    static get instance() {
        if (!this._instance) {
            this._instance = new Performer();
        }
        return this._instance;
    }

    _isPerforming = false;

    get isPerforming() {
        return this._isPerforming;
    }

    private set isPerforming(value: boolean) {
        this._isPerforming = value;
    }

    run(perform: () => Promise<void>) {
        if (this.isPerforming) {
            return;
        }

        this.isPerforming = true;
        perform().then(() => {
            this.isPerforming = false;
        });
    }
}
