module conditional_types {
    function testBasic() {
        interface Animal {
            live(): void;
        }

        interface Dog extends Animal {
            woof(): void;
        }

        type A = Dog extends Animal ? number : string;
        type B = string extends Animal ? number : string;
    }

    function testAdvanced() {
        interface IdLabel {
            id: number /* some fields */;
        }
        interface NameLabel {
            name: string /* other fields */;
        }

        // function createLabel(id: number): IdLabel;
        // function createLabel(name: string): NameLabel;
        // function createLabel(nameOrId: string | number): IdLabel | NameLabel;
        // function createLabel(nameOrId: string | number): IdLabel | NameLabel {
        //     throw Error('yes?');
        // }

        // 下面的做法可以避免重复定义各种函数重载
        type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

        function createLabel<T extends number | string>(value: T) : NameOrId<T> {
            if (typeof value === 'number') {
                return { id: value } as NameOrId<T>;
            }
            return { name: value } as NameOrId<T>;
        }

        console.log(createLabel('lovebird'));
        console.log(createLabel(12345));
        console.log(createLabel('hello'.includes('h') ? 1 : 'hi'));
    }

    function testAdvanced2() {
        type MessageOf<T> = T extends {message: string} ? T['message'] : never;
        interface Email { message: string }
        interface Dog { bark(): void }
        type EmailMessage = MessageOf<Email>;
        type DogMessage = MessageOf<Dog>;
        const content: EmailMessage = 'Wahaha';
    }

    function testAdvanced3() {
        type Flatem<T> = T extends any[] ? T[number] : T;
        type Str = Flatem<string[]>;
        type Num = Flatem<number>;
    }

    function testInfer() {
        type ReturnType2<T> = T extends (...args: never[]) => infer Return ? Return : never;
        type A = ReturnType2<() => number>;
        type B = ReturnType2<(a: number) => string[]>;
        type C = ReturnType2<number>;
    }

    function testDistributive() {
        type ArrayFor<T> = T extends any ? T[] : never;
        type NumArray = ArrayFor<number>;
        type StringArray = ArrayFor<string>;
        type NumOrString = number | string;
        type NumOrStrArray = ArrayFor<NumOrString>;

        type ArrayFor2<T> = [T] extends [any] ? [T] : never;
        type NumOrString2 = ArrayFor2<NumOrString>;
        type NumOrString3 = ArrayFor2<number | string>;
    }

    testBasic();
    testAdvanced();
}
