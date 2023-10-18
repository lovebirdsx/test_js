import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CalcController } from '../calc/calc.controller';
import { AppService, CalcService } from './app.service';
import { CatsModule } from '../cat/cat.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ArticleModule } from '../article/article.module';
import { PoliciesGuard } from '../policy/policy.guard';
import { PolicyModule } from '../policy/policy.module';
import { CalcModule } from '../calc/calc.module';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CaslModule, AuthModule, PolicyModule, CatsModule, UserModule, ArticleModule, CalcModule],
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
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    AppService,
    CalcService,
  ],
})
export class AppModule {}
