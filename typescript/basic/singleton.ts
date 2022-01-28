class Singleton {
    private static instance: any;

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    info() {
        console.log(this.name);
    }

    static get Instance() : Singleton {
        if (!this.instance) {
            this.instance = new Singleton('hello');
        }
        return this.instance;
    }
}

const s = Singleton.Instance;
s.info();

export default Singleton;
