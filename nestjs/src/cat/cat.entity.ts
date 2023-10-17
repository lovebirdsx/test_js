import { Schema, Document } from 'mongoose';
import { InterfaceToSchema } from '../shared/scheme.type';
import { SharedCat } from '../common/type';

export type Cat = SharedCat & Document;

const catSchemeDefinition: InterfaceToSchema<SharedCat> = {
  name: { type: String, required: true },
  age: Number,
  breed: String,
};

export const CatSchema = new Schema(catSchemeDefinition);
