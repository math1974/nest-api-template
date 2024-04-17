import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import CustomerType from 'src/shared/enums/customer-type.enum';

export class CreateCustomerDto {
  @IsNotEmpty()
  type: CustomerType;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  cpf: string;

  @IsOptional()
  @MinLength(14)
  @MaxLength(14)
  cnpj: string;

  @IsNotEmpty()
  is_pf: boolean;

  @IsOptional()
  @MaxLength(255)
  address: string;
}
