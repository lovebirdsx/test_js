import { Controller, Get, Post, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService, CalcService } from './app.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AppInterceptor } from './app.interceptor';

@UseInterceptors(AppInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return { ...req.user };
  }
}

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Get('add')
  add(@Query('a') a: string, @Query('b') b: string): number {
    const na = parseFloat(a);
    const nb = parseFloat(b);
    return this.calcService.add(na, nb);
  }

  @Get('sub')
  sub(@Query('a') a: string, @Query('b') b: string): number {
    const na = parseFloat(a);
    const nb = parseFloat(b);
    return this.calcService.sub(na, nb);
  }

  @Get('mul')
  mul(@Query('a') a: string, @Query('b') b: string): number {
    const na = parseFloat(a);
    const nb = parseFloat(b);
    return this.calcService.mul(na, nb);
  }

  @Get('div')
  div(@Query('a') a: string, @Query('b') b: string): number {
    const na = parseFloat(a);
    const nb = parseFloat(b);
    return this.calcService.div(na, nb);
  }
}
