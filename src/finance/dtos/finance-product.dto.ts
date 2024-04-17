import { IsNotEmpty } from 'class-validator';

export default class FinanceProductDto {
  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  amount: number;
}
