module indexed_access_types {
    type A = { name: string; age: number; alive: boolean };
    type B = A['name']
    const b: B = 'hello';
    console.log(b);

    type C = A['name' | 'age']
    const c1: C = 12;
    const c2: C = 'foo';

    type AliveOrName = 'name' | 'alive';
    type D = A[AliveOrName];
    const d1: D = false;
    const d2: D = 'bar';

    type E = A[keyof A]

    const myArray = [
        { name: 'Alice', age: 15 },
        { name: 'Bob', age: 23 },
        { name: 'Eve', age: 38 },
    ];
    type Person = typeof myArray[0];
    type Name = Person['name'];
    type Age = typeof myArray[0]['name'];
}
