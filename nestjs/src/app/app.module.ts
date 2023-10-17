import { Module } from '@nestjs/common';
import { AppController, CalcController } from './app.controller';
import { AppService, CalcService } from './app.service';
import { CatsModule } from '../cats/cat.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/auth.guard';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CatsModule, AuthModule, UsersModule],
  controllers: [AppController, CalcController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    CalcService,
  ],
})
export class AppModule {}
