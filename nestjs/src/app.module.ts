import { Module } from '@nestjs/common';
import { AppController, CalcController } from './app.controller';
import { AppService, CalcService } from './app.service';
import { CatsModule } from './cats/cat.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    CatsModule, 
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, CalcController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
    CalcService
  ],
})
export class AppModule {}
