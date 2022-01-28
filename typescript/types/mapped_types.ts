module mapped_types {
    function testFlagsToOptions() {
        type FeatureFlags = {
            drakMode() : void;
            newUserProfile() : void;
        };
        type OptionsFlag<Type> = {
            [property in keyof Type] : boolean;
        };
        type FeatureFlagsOptions = OptionsFlag<FeatureFlags>;
    }

    function testRemoveReadonly() {
        type Foo = {
            readonly name: string;
            readonly id: number;
        };
        type CreateMutable<Type> = {
            -readonly [property in keyof Type] : Type[property]
        };
        type MutableFoo = CreateMutable<Foo>;
    }

    function testRemoveOptional() {
        type Foo = {
            name: string;
            id?: number;
        };
        type RemoveOptional<Type> = {
            [property in keyof Type] -? : Type[property]
        };
        type Foo2 = RemoveOptional<Foo>;
    }

    function testRemaping() {
        type Getters<Type> = {
            [property in keyof Type as `get${Capitalize<string & property>}`] : () => Type[property];
        };
        type Person = {
            name: string;
            age: number;
            sex: boolean;
        };
        type PersonGetter = Getters<Person>;
    }

    function testRemoveFiled() {
        type RemoveFiledKind<Type> = {
            [property in keyof Type as Exclude<property, 'kind'>] : Type[property];
        };
        type Foo = {
            name: string;
            kind: string;
        };
        type FooWithoutKind = RemoveFiledKind<Foo>;
    }

    function testPullEvent() {
        type EventConfig<Events extends {kind: string}> = {
            [E in Events as E['kind']]: (e:E) => void;
        };
        type SquareEvent = { kind: 'squre'; x: number; y: number; }
        type CircleEvent = { kind: 'circle'; r: number; }
        type Config = EventConfig<SquareEvent | CircleEvent>
    }

    function testFurtherExploration() {
        type ExtractPII<Type> = {
            [property in keyof Type]: Type[property] extends { pii: true} ? true : false;
        };
        type DBFields = {
            id: {format: 'incrementing'};
            name: {type: string; pii: true};
        }
        type Foo = ExtractPII<DBFields>;
    }
}
