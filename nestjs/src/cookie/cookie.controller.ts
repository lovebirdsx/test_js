import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from '../auth/auth.decorator';

@Controller('cookie')
@Public()
export class CookieController {
  @Get('get')
  getCookie(@Req() req: Request) {
    return `Stored cookie value: ${req.cookies['myCookie']}`;
  }

  @Get('set')
  setCookie(@Res() res: Response) {
    res.cookie('myCookie', 'Hello, world!');
    res.send('Cookie has been set.');
  }

  @Get('clear')
  clearCookie(@Res() res: Response) {
    res.clearCookie('myCookie');
    res.send('Cookie has been cleared.');
  }
}
