import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CAT_MODEL } from '../const';
import { Cat } from './cat.entity';
import { CreateCatDto } from './cat.dto';

@Injectable()
export class CatService {
  constructor(
    @Inject(CAT_MODEL)
    private catModel: Model<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async remove(id: string): Promise<any> {
    return await this.catModel.findByIdAndRemove(id);
  }
}
