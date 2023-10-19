import { Module } from '@nestjs/common';
import { FeishuAuthController } from './feishu.auth.controller';
import { UserModule } from '../../user/user.module';
import { FeishuAuthService } from './feishu.auth.service';
import { FeishuGuard } from './feishu.auth.guard';

@Module({
  imports: [UserModule],
  controllers: [FeishuAuthController],
  providers: [FeishuAuthService, FeishuGuard],
  exports: [FeishuAuthService, FeishuGuard],
})
export class FeishuAuthModule {}
