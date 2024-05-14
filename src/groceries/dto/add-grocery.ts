import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddGroceryDto {
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

  @IsNumber()
  quantity: number;
}
