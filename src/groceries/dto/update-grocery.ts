import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGroceryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  description: string;
}
