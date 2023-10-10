import { Controller, Get } from '@nestjs/common';
import { MongoDbService } from './mongodb.service';

@Controller('mongo')
export class MongoDbController {
  constructor(private readonly mongoDbService: MongoDbService) {}

  @Get()
  getHello(): string {
    return 'hello mongo';
  }
}
