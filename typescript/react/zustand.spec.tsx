import { act, render } from '@testing-library/react';
import { produce } from 'immer';
import React, { useEffect, useRef } from 'react';
import { create, StateCreator } from 'zustand';
import {
  createJSONStorage, persist, StateStorage,
} from 'zustand/middleware';

interface BearState {
  bears: number;
}

interface BearActions {
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useBearStore = create<BearState & BearActions>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

class StateStorageMock implements StateStorage {
  storage: Record<string, string> = {};

  getItem(name: string) {
    return this.storage[name];
  }

  setItem(name: string, value: string) {
    this.storage[name] = value;
  }

  removeItem(name: string) {
    delete this.storage[name];
  }
}

describe('zustand', () => {
  it('basic', () => {
    let renderCount = 0;
    function BearCounter() {
      const bears = useBearStore((state) => state.bears);
      renderCount++;
      return <h1>{`${bears} around here ...`}</h1>;
    }

    let controlCount = 0;
    function Controls() {
      const increasePopulation = useBearStore((state) => state.increasePopulation);
      const removeAllBears = useBearStore((state) => state.removeAllBears);
      controlCount++;
      return (
        <>
          <button onClick={increasePopulation}>one up</button>
          <button onClick={removeAllBears}>remove all</button>
        </>
      );
    }

    const { container } = render(
      <>
        <BearCounter />
        <Controls />
      </>,
    );

    const buttons = container.querySelectorAll('button');
    act(() => buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true })));
    act(() => buttons[1].dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(renderCount).toBe(3);
    expect(controlCount).toBe(1);
  });

  it('async action', async () => {
    interface BearState {
      bears: number;
      increasePopulation: () => Promise<void>;
    }
    const useBearStoreAsync = create<BearState>((set) => ({
      bears: 0,
      increasePopulation: async () => {
        await new Promise((resolve) => { setTimeout(resolve, 1); });
        set((state) => ({ bears: state.bears + 1 }));
      },
    }));

    let renderCount = 0;
    function BearCounter() {
      const bears = useBearStoreAsync((state) => state.bears);
      renderCount++;
      return <h1>{`${bears} around here ...`}</h1>;
    }

    render(<BearCounter />);
    await act(() => useBearStoreAsync.getState().increasePopulation());

    expect(renderCount).toBe(2);
  });

  it('modify state outsize react', () => {
    let renderCount = 0;
    function BearCounter() {
      const bears = useBearStore((state) => state.bears);
      renderCount++;
      return <h1>{`${bears} around here ...`}</h1>;
    }

    render(<BearCounter />);
    act(() => useBearStore.setState({ bears: 10 }));

    expect(renderCount).toBe(2);
  });

  it('transient update', () => {
    let renderCount = 0;
    function BearCounter() {
      const bearsRef = useRef(useBearStore.getState().bears);
      useEffect(() => useBearStore.subscribe((state) => { bearsRef.current = state.bears; }), []);
      renderCount++;
      return <h1>{`${bearsRef} around here ...`}</h1>;
    }

    render(<BearCounter />);
    act(() => useBearStore.setState({ bears: 10 }));

    expect(renderCount).toBe(1);
  });

  it('change nested state', () => {
    interface NestedState {
      nested: { count: number };
    }

    interface NestedActions {
      clearForeset: () => void;
    }

    const nestedStore = create<NestedState & NestedActions>(
      (set) => ({
        nested: { count: 10 },
        clearForeset: () => set(
          (state) => (
            produce(state, () => {
              state.nested.count = 0;
            })
          ),
        ),
      }),
    );

    expect(nestedStore.getState().nested.count).toBe(10);

    const { clearForeset } = nestedStore.getState();
    clearForeset();

    expect(nestedStore.getState().nested.count).toBe(0);
  });

  it('persist state', () => {
    const storage = new StateStorageMock();
    const useBearStoreWithPersist = create<BearState & BearActions>()(
      persist(
        (set) => ({
          bears: 0,
          increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
          removeAllBears: () => set({ bears: 0 }),
        }),
        {
          name: 'bear',
          storage: createJSONStorage(() => storage),
        },
      ),
    );

    useBearStoreWithPersist.getState().increasePopulation();
    expect(storage.getItem('bear')).toEqual(JSON.stringify({ state: { bears: 1 }, version: 0 }));
  });

  it('slice pattern', () => {
    interface BearSlice {
      bear: {
        count: number;
        add: () => void;
        eatFish: () => void;
      }
    }

    interface FishSlice {
      fish: {
        count: number;
        add: () => void;
      }
    }

    interface SharedSlice {
      shared: {
        addBoth: () => void;
        getBoth: () => number;
      }
    }

    const createBearSlice: StateCreator<BearSlice & FishSlice, [], [], BearSlice> = (set) => ({
      bear: {
        count: 0,
        add: () => set((state) => ({ bear: { ...state.bear, count: state.bear.count + 1 } })),
        eatFish: () => set((state) => ({ fish: { ...state.fish, count: state.fish.count - 1 } })),
      },
    });

    const createFishSlice: StateCreator<FishSlice, [], [], FishSlice> = (set) => ({
      fish: {
        count: 0,
        add: () => set((state) => ({ fish: { ...state.fish, count: state.fish.count + 1 } })),
      },
    });

    const createSharedSlice: StateCreator<BearSlice & FishSlice, [], [], SharedSlice> = (set, get) => ({
      shared: {
        addBoth: () => {
          get().bear.add();
          get().fish.add();
        },
        getBoth: () => get().bear.count + get().fish.count,
      },
    });

    const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()(
      (...a) => ({
        ...createBearSlice(...a),
        ...createFishSlice(...a),
        ...createSharedSlice(...a),
      }),
    );

    let bearRenderCount = 0;
    function BearCounter() {
      const bears = useBoundStore((state) => state.bear.count);
      bearRenderCount++;
      return <h1>{`${bears} around here ...`}</h1>;
    }

    let fishRenderCount = 0;
    function FishCounter() {
      const fishes = useBoundStore((state) => state.fish.count);
      fishRenderCount++;
      return <h1>{`${fishes} around here ...`}</h1>;
    }

    function App() {
      return (
        <>
          <BearCounter />
          <FishCounter />
        </>
      );
    }

    render(<App />);
    act(() => useBoundStore.getState().shared.addBoth());
    expect(bearRenderCount).toBe(2);
    expect(fishRenderCount).toBe(2);

    act(() => useBoundStore.getState().bear.eatFish());
    expect(bearRenderCount).toBe(2);
    expect(fishRenderCount).toBe(3);

    act(() => useBoundStore.getState().fish.add());
    expect(bearRenderCount).toBe(2);
    expect(fishRenderCount).toBe(4);
  });

  it('subscribe', () => {
    interface Foo {
      count: number;
      increase: (count: number) => void;
    }

    const useFooStore = create<Foo>((set, get, api) => ({
      count: 0,
      increase: (count: number) => {
        set((state) => ({ count: state.count + count }));
      },
    }));

    let count = 0;
    let callCount = 0;
    const unsubscribe = useFooStore.subscribe((state) => {
      callCount++;
      count = state.count;
    });

    useFooStore.getState().increase(1);
    useFooStore.getState().increase(1);

    expect(count).toBe(2);
    expect(callCount).toBe(2);
  });

  it('event', () => {
    interface Disposable {
      dispose(): void;
    }

    type Event<T> = (listener: (e: T) => void) => Disposable;

    class Emitter<T> {
      private listeners: Array<(event: T) => void> = [];

      public event: Event<T> = (listener: (e: T) => void): Disposable => {
        this.listeners.push(listener);
        return {
          dispose: () => {
            const index = this.listeners.indexOf(listener);
            if (index >= 0) {
              this.listeners.splice(index, 1);
            }
          },
        };
      };

      public fire(event: T): void {
        for (const listener of this.listeners.slice()) {
          listener(event);
        }
      }
    }

    interface Foo {
      count: number;
      increase: (count: number) => void;
      decrease: (count: number) => void;
      onCountChange: Event<number>;
    }

    const useFooStore = create<Foo & { countChangeEmitter: Emitter<number> }>(
      (set) => {
        const countChangeEmitter = new Emitter<number>();

        return {
          count: 0,
          countChangeEmitter,
          decrease: (count: number) => {
            set((state) => {
              const newCount = state.count - count;
              state.countChangeEmitter.fire(newCount);
              return { count: newCount };
            });
          },
          increase: (count: number) => {
            set((state) => {
              const newCount = state.count + count;
              state.countChangeEmitter.fire(newCount);
              return { count: newCount };
            });
          },
          onCountChange: countChangeEmitter.event,
        };
      },
    );

    const fooStore = useFooStore.getState();

    let callCount = 0;
    let count = 0;
    const disposable = fooStore.onCountChange((newCount) => {
      callCount++;
      count = newCount;
    });

    fooStore.increase(1);
    fooStore.decrease(1);

    expect(count).toBe(0);
    expect(callCount).toBe(2);

    disposable.dispose();
  });
});
