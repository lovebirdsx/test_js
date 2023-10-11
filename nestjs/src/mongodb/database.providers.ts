import * as mongoose from 'mongoose';
import { MONGO_URI } from '../config';
import { DATABASE_CONNECTION } from '../const';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(MONGO_URI),
  },
];
