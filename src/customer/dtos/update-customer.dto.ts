import { IsNotEmpty, IsOptional, Max, MaxLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  @MaxLength(11)
  cpf: string;

  @IsOptional()
  @MaxLength(14)
  cnpj: string;

  @IsNotEmpty()
  is_pf: boolean;

  @IsOptional()
  @MaxLength(255)
  address: string;
}
