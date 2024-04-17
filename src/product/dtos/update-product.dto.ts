import { IsEnum, IsNotEmpty, MaxLength, Min } from 'class-validator';
import ProductUnity from 'src/shared/enums/product-unity.enum';

export class UpdateProductDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEnum(ProductUnity)
  unity: string;

  @IsNotEmpty()
  @Min(0)
  price: number;
}
