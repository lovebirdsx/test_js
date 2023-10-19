import { Controller, Get, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from '../auth/auth.service';
import { AppInterceptor } from './app.interceptor';
import { Public } from '../auth/auth.decorator';
import { FeishuGuard } from '../auth/feishu/feishu.auth.guard';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(AppInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(FeishuGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login/local')
  async loginLocal(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return { ...req.user };
  }
}
