import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../auth.decorator';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    const result = await super.canActivate(context);
    if (!result) {
      return false;
    }

    // 确保user是一个完整的对象（譬如必然包含role字段）
    const request = context.switchToHttp().getRequest();
    const user = await this._userService.findOne(request.user.username);
    if (!user) {
      return false;
    }

    return true;
  }
}
