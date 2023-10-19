import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from '../cat/cat.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from '../article/article.module';
import { PoliciesGuard } from '../policy/policy.guard';
import { PolicyModule } from '../policy/policy.module';
import { CalcModule } from '../calc/calc.module';
import { CaslModule } from '../casl/casl.module';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { CookieModule } from '../cookie/cookie.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CookieModule,
    CaslModule,
    AuthModule,
    PolicyModule,

    CalcModule,
    UserModule,
    CatsModule,
    ArticleModule,
  ],
  controllers: [AppController],
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
  ],
})
export class AppModule {}
