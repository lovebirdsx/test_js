import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ARTICLE_MODEL } from '../const';
import { Model } from 'mongoose';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(@Inject(ARTICLE_MODEL) private mode: Model<Article>) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.mode.create(createArticleDto);
  }

  async findAll() {
    return await this.mode.find();
  }

  async findOne(id: string) {
    return await this.mode.findById(id);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.mode.findByIdAndUpdate(id, updateArticleDto);
  }

  async remove(id: string) {
    return await this.mode.findByIdAndRemove(id);
  }
}
