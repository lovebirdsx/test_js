import { DynamicModule, Injectable, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';

const SERVICE = 'SERVICE_A';

abstract class BaseService {
  abstract get(): string;
}

@Injectable()
class ServiceA extends BaseService {
  get(): string {
    return 'A';
  }
}

@Injectable()
class ServiceB extends BaseService {
  get(): string {
    return 'B';
  }
}

@Module({})
class ServiceModule {
  static forRoot(isA: boolean): DynamicModule {
    const providers = [
      {
        provide: SERVICE,
        useClass: isA ? ServiceA : ServiceB,
      },
    ];
    return {
      module: ServiceModule,
      providers: providers,
      exports: providers,
    };
  }
}

describe('service', () => {
  it('should work', async () => {
    const app = await Test.createTestingModule({
      imports: [ServiceModule.forRoot(true)],
    }).compile();

    const service = app.get<BaseService>(SERVICE);
    expect(service.get()).toEqual('A');

    await app.close();

    const app2 = await Test.createTestingModule({
      imports: [ServiceModule.forRoot(false)],
    }).compile();

    const service2 = app2.get<BaseService>(SERVICE);
    expect(service2.get()).toEqual('B');

    await app2.close();
  });
});
