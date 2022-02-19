module static_field {
    function testBasic() {
        class Params {

        }
        class FooParams extends Params {
            static key = 'Foo';
        }
        class BarParams extends Params {
            static key = 'Bar';
        }

        type ParamsClass = { new() : Params; key: string };
        function logClass(params:ParamsClass) {
            console.log(params.name);
            console.log(params.key);
        }

        console.log(FooParams);
        console.log(BarParams);
    }

    testBasic();
}
