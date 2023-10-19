import { Controller, Get, Post, Body, Delete, Param, ForbiddenException } from '@nestjs/common';
import { CreateCatDto } from './cat.dto';
import { CatService } from './cat.service';
import { Cat } from './cat.entity';
import { Roles } from '../role/role.decorator';
import { Role } from '../common/type';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catService.remove(id);
  }

  @Delete()
  async removeAll(): Promise<void> {
    throw new ForbiddenException();
  }
}
