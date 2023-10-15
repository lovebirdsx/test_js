import { Controller, Get, Post, Body, Delete, Param, ForbiddenException, UseFilters, UsePipes } from '@nestjs/common';
import { CreateCatDto, CreateCatDtoScheme } from './cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './cat.interface';
import { HttpExceptionFilter } from '../http-exception.filter';
import { SchemaPipe } from '../schema/schema.pipe';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(new SchemaPipe(CreateCatDtoScheme))
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
