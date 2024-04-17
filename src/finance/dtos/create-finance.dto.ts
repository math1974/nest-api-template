import { IsNotEmpty, IsOptional } from 'class-validator';
import FinanceType from 'src/shared/enums/finance-type.enum';
import FinanceProductDto from './finance-product.dto';

export class CreateFinanceDto {
  @IsNotEmpty()
  type: FinanceType;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  date: string;

  @IsOptional()
  customer_id: number;

  @IsOptional()
  products?: FinanceProductDto[];
}
