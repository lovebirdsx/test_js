import { Document, Schema } from 'mongoose';
import { SharedArticle } from '../../common/type';
import { InterfaceToSchema } from '../../shared/scheme.type';

export type Article = SharedArticle & Document;

const articleSchemeDefinition: InterfaceToSchema<SharedArticle> = {
  _id: { type: String, alias: 'id', required: true },
  title: { type: String, required: true },
  isPublished: { type: Boolean, required: true },
  authorId: { type: Number, required: true },
};

export const ArticleSchema = new Schema(articleSchemeDefinition);

// 虚拟字段，返回的数据中包含 id 字段
ArticleSchema.virtual('id').get(function (this: Article) {
  return this._id;
});

// 返回的数据中不包含 _id和__v字段
ArticleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: Document, ret: Article) {
    delete ret._id;
  },
});
