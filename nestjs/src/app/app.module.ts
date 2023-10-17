import { Module } from '@nestjs/common';
import { AppController, CalcController } from './app.controller';
import { AppService, CalcService } from './app.service';
import { CatsModule } from '../cat/cat.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../role/role.guard';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CatsModule, AuthModule, UsersModule, ArticleModule],
  controllers: [AppController, CalcController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
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
