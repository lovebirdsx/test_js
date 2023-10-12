import * as mongoose from 'mongoose';
import { MONGO_URI } from '../config';
import { DATABASE_CONNECTION } from '../const';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<mongoose.Mongoose> => {
      const connection = await mongoose.connect(MONGO_URI);
      return connection;
    },
  },
];
