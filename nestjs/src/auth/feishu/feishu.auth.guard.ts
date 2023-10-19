import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FeishuAuthService } from './feishu.auth.service';

@Injectable()
export class FeishuGuard implements CanActivate {
  constructor(private readonly _authService: FeishuAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { code, redirect_uri } = request.query;
    if (!code || !redirect_uri) {
      throw new UnauthorizedException('code or redirect_uri in query is empty');
    }

    const user = await this._authService.validateUser(code, redirect_uri);
    if (!user) {
      throw new UnauthorizedException('code or redirect_uri is invalid');
    }
    return true;
  }
}
