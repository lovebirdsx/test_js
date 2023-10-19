import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './local/local.auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './jwt/jwt.auth.strategy';
import { ConfigService } from '@nestjs/config';
import { FeishuGuard } from './feishu/feishu.auth.guard';
import { FeishuAuthModule } from './feishu/feishu.auth.moudule';
import { FeishuAuthService } from './feishu/feishu.auth.service';

// 参考：https://docs.nestjs.cn/10/security?id=%e8%ae%a4%e8%af%81%ef%bc%88authentication%ef%bc%89
@Module({
  imports: [
    UserModule,
    FeishuAuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy, FeishuGuard, FeishuAuthService],
  exports: [AuthService, FeishuGuard, FeishuAuthService],
})
export class AuthModule {}
