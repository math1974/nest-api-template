import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import FinanceType from 'src/shared/enums/finance-type.enum';

export default class ListFinanceDto {
  @IsOptional()
  start_date: string;

  @IsOptional()
  end_date: string;

  @IsNotEmpty()
  type: FinanceType;

  @IsNotEmpty()
  page: number;
}
