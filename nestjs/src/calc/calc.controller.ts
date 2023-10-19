import { Controller, Get, Query } from '@nestjs/common';
import { CalcService } from './calc.service';
import { Public } from '../auth/auth.decorator';

@Controller('calc')
@Public()
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
