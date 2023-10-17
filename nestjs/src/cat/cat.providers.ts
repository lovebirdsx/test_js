import { Connection } from 'mongoose';
import { CatSchema } from './cat.entity';
import { CAT_MODEL, DATABASE_CONNECTION } from '../const';

export const catProviders = [
  {
    provide: CAT_MODEL,
    useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
    inject: [DATABASE_CONNECTION],
  },
];
