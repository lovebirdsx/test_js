import { ARTICLE_MODEL, DATABASE_CONNECTION } from '../const';
import { Connection } from 'mongoose';
import { ArticleSchema } from './entities/article.entity';

export const articleProviders = [
  {
    provide: ARTICLE_MODEL,
    useFactory: (connection: Connection) => connection.model('Article', ArticleSchema),
    inject: [DATABASE_CONNECTION],
  },
];
