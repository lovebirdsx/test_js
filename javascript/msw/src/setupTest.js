import { server } from './mocks/server';

class MockStorage {
    constructor() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value;
    }

    removeItem(key) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

beforeAll(() => {
    global.sessionStorage = new MockStorage();
    server.listen()
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
