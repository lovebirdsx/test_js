/* eslint-disable max-classes-per-file */
class TestTypeAssert {
    static testBasic() {
        interface Cat {
            name: string;
            walk(): void;
        }

        interface Bird {
            name: string;
            fly(): void;
        }

        const cat: Cat = {
            name: 'Cat',
            walk() {
                console.log('Cat walk');
            },
        };

        const bird: Bird = {
            name: 'Bird',
            fly() {
                console.log('Bird fly');
            },
        };

        function IsCat(animal: Cat | Bird) {
            return typeof (animal as Cat).walk === 'function';
        }

        console.log(cat, 'is cat', IsCat(cat));
        console.log(bird, 'is cat', IsCat(bird));
    }

    static testClass() {
        class ApiError extends Error {
            name: string = 'ApiError';

            code: number = 0;
        }

        class HttpError extends Error {
            name: string = 'HttpError';

            statusCode: number = 200;
        }

        function isApiError(error: Error) {
            return error instanceof ApiError;
        }

        const apiError = new ApiError();
        const httpError = new HttpError();
        console.log(apiError.name, 'is ApiError =', isApiError(apiError));
        console.log(httpError.name, 'is ApiError =', isApiError(httpError));
    }

    static testClass2() {
        interface ApiError extends Error {
            code: number;
        }

        interface HttpError extends Error {
            statusCode: number;
        }

        function isApiError(error: Error) {
            return typeof (error as ApiError).code === 'number';
        }

        const apiError: ApiError = {
            code: 0,
            name: 'ApiError',
            message: '',
        };
        const httpError: HttpError = {
            statusCode: 200,
            name: 'HttpError',
            message: '',
        };
        console.log(apiError.name, 'is ApiError =', isApiError(apiError));
        console.log(httpError.name, 'is ApiError =', isApiError(httpError));
    }

    static testInterfaceCompatible() {
        interface Animal {
            name: string;
        }
        interface Cat {
            name: string;
            run(): void;
        }

        const cat: Cat = {
            name: 'Cat',
            run() {
                console.log('Cat run');
            },
        };

        const animal = cat as Animal;
        console.log(animal.name);

        const animal2: Animal = {
            name: 'Dog',
        };

        // eslint-disable-next-line no-unused-vars
        const cat2: Cat = animal2 as Cat;
        // let cat3:Cat = animal2; 此句不能通过编译
        // cat2.run(); 会报错
    }

    static testGeneric() {
        interface Animal {
            name: string;
        }
        interface Cat {
            name: string;
            run(): void;
        }
        interface Bird {
            name: string;
            fly(): void;
        }
        function Get<T>(who: Animal): T {
            return who as any;
        }

        const cat: Cat = {
            name: 'Cat',
            run() {
                console.log('Cat run');
            },
        };
        const bird: Bird = {
            name: 'Brid',
            fly() {
                console.log('Brid fly');
            },
        };
        console.log(Get<Animal>(cat).name);
        console.log(Get<Animal>(bird).name);
    }

    static Run() {
        TestTypeAssert.testBasic();
        TestTypeAssert.testClass();
        TestTypeAssert.testClass2();
        TestTypeAssert.testInterfaceCompatible();
        TestTypeAssert.testGeneric();
    }
}

TestTypeAssert.Run();
