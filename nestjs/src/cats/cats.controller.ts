import { Controller, Get, Post, Body, Delete, Param, ForbiddenException, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCatDto } from './cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './cat.interface';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(new ValidationPipe()) // 参考https://docs.nestjs.cn/10/techniques?id=%e9%aa%8c%e8%af%81
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(id);
  }

  @Delete()
  async removeAll(): Promise<void> {
    throw new ForbiddenException();
  }
}
