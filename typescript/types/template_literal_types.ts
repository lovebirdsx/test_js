module template_literal_types {
    function testBasic() {
        type Hello = 'hello';
        type HelloWorld = `${Hello} world`;

        type Id1 = 'foo' | 'bar';
        type Id2 = 'car' | 'baz';
        type Ids = `${Id1 | Id2}_id`;
        type Lang = 'cn' | 'en' | 'ru';
        type LangIds = `${Lang}_${Ids}`;
    }

    function testKeyof() {
        type Person = {
            name: 'lovebird',
            age: 18,
        };
        type AddPrefix<Type> = {
            [property in keyof Type as `pe_${string & property}`] : Type[property]
        };
        type PrefixPerson = AddPrefix<Person>;
    }

    type PropertyEventSource<Type> = {
        on<Key extends string & keyof Type>(
            eventName: `${Key}Changed`, callback: (value: Type[Key]) => void
        ):void;
    };

    declare function MakeEventCallback<Type>(obj: Type) : Type & PropertyEventSource<Type>;

    const data = {
        firstName: 'Song',
        lastName: 'Xiao',
        age: 18,
    };
    const player = MakeEventCallback(data);
    console.log(player.firstName);
    player.on('firstNameChanged', (value) => console.log(value));
    player.firstName = 'lovebird';
}
