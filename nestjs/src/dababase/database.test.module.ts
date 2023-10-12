import { Module } from '@nestjs/common';
import {
  MemoryDatabaseService,
  memoryDatabaseProviders,
} from './database.test.providers';

@Module({
  providers: [MemoryDatabaseService, ...memoryDatabaseProviders],
  exports: [...memoryDatabaseProviders],
})
export class DatabaseTestModule {}
