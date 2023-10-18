import { Module } from '@nestjs/common';
import { PoliciesGuard } from './policy.guard';
import { CaslModule } from '../casl/casl.module';

// 参考：https://docs.nestjs.cn/10/security?id=%e8%ae%a4%e8%af%81%ef%bc%88authentication%ef%bc%89
@Module({
  imports: [CaslModule],
  providers: [PoliciesGuard],
  exports: [PoliciesGuard],
})
export class PolicyModule {}
