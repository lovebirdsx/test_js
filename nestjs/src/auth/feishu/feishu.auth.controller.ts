import { Controller, Get, Post, Req } from '@nestjs/common';
import { FeishuAuthService } from './feishu.auth.service';
import { UserService } from '../../user/user.service';

@Controller('auth/feishu')
export class FeishuAuthController {
  constructor(
    private readonly _feishuAuthService: FeishuAuthService,
    private readonly _userService: UserService,
  ) {}

  @Post()
  async loginFeishu() {
    // 重定向到飞书登录页面
    console.log('login feishu');
  }

  @Get('callback')
  feishuCallback(@Req() req) {
    // 用户已通过身份验证
    return {
      message: 'User information',
      user: req.user,
    };
  }
}

// import { Controller, Post, Body } from '@nestjs/common';
// import { FeishuAuthService } from './feishu-auth.service';
// import { UserService } from '../user/user.service';

// @Controller('feishu-auth')
// export class FeishuAuthController {
//   constructor(
//     private readonly feishuAuthService: FeishuAuthService,
//     private readonly userService: UserService,
//   ) {}

//   @Post('login')
//   async login(@Body('code') code: string) {
//     // Step 1: Get user_access_token from Feishu
//     const tokenInfo = await this.feishuAuthService.getTokenInfo(code);

//     // Step 2: Get user profile from Feishu
//     const feishuProfile = await this.feishuAuthService.getFeishuProfile(tokenInfo.accessToken);

//     // Step 3: Update user in database
//     const updatedUser = await this.userService.updateUser(feishuProfile);

//     // Step 4: Generate and return JWT
//     const jwt = this.userService.generateJWT(updatedUser);

//     return { jwt };
//   }
// }
