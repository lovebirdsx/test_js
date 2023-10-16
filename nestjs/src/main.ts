import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 参考https://docs.nestjs.cn/10/techniques?id=%e9%aa%8c%e8%af%81
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
