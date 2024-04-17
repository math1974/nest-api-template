import { IsNotEmpty, IsOptional } from 'class-validator';
import FinanceType from 'src/shared/enums/finance-type.enum';

export default class ListCustomerDto {
  @IsOptional()
  name: string;

  @IsNotEmpty()
  type: FinanceType;

  @IsNotEmpty()
  page: number;
}
