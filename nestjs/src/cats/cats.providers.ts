import { Connection } from 'mongoose';
import { CatSchema } from './cats.schema';
import { CAT_MODEL, DATABASE_CONNECTION } from 'src/const';

export const catsProviders = [
  {
    provide: CAT_MODEL,
    useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
    inject: [DATABASE_CONNECTION],
  },
];
