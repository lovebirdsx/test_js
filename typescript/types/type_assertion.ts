function testTypeAssertion() {
    function testBasic() {
        interface Cat {
            name: string;
            mowl() : void;
        }
        interface Dog {
            name: string;
            bark() : void;
        }
        function isCat(pet: Cat | Dog): pet is Cat {
            return (pet as Cat).mowl !== undefined;
        }

        const pet: Cat | Dog = { name: 'Cat', mowl: () => console.log('Cat mowl') };
        if (isCat(pet)) {
            pet.mowl();
        } else {
            // pet.bark();
        }
    }

    testBasic();
}
