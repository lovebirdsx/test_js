import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DATABASE_CONNECTION } from '../const';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class MemoryDatabaseService implements OnModuleDestroy {
  private _server: MongoMemoryServer;
  private _connection: typeof mongoose;

  async connect(): Promise<typeof mongoose> {
    if (this._connection) {
      return this._connection;
    }

    this._server = await MongoMemoryServer.create();
    this._connection = await mongoose.connect(this._server.getUri());
    return this._connection;
  }

  async onModuleDestroy() {
    if (!this._connection) {
      return;
    }

    await this._connection.disconnect();
    await this._server.stop();
  }
}

export const memoryDatabaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (
      service: MemoryDatabaseService,
    ): Promise<typeof mongoose> => {
      return await service.connect();
    },
    inject: [MemoryDatabaseService],
  },
];
