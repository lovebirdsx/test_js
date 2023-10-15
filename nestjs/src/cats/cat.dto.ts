import * as Joi from 'joi';

export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

export const CreateCatDtoScheme = Joi.object<CreateCatDto, true>({
  name: Joi.string().min(3).max(50).required(),
  age: Joi.number().integer().min(0).max(30).required(),
  breed: Joi.string().min(3).max(50).required(),
});
