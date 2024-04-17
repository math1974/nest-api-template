import { IsNotEmpty, Min } from 'class-validator';
import ProductUnity from 'src/shared/enums/product-unity.enum';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  unity: ProductUnity;

  @IsNotEmpty()
  @Min(0)
  price: number;
}
