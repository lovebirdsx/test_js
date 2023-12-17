import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User, getUser, getName } from 'common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const user: User = {
    email: 'hello',
  };

  Logger.log(user.email);

  const user2 = getUser();
  Logger.log(user2.email);

  const name = getName();
  Logger.log(name);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
