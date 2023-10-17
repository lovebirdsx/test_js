import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @Min(0)
  @Max(30)
  readonly age: number;

  @IsString()
  @Length(3, 50)
  readonly breed: string;
}
