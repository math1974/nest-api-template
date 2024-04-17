import { IsNotEmpty, IsOptional } from 'class-validator';

export default class ListProductDto {
  @IsOptional()
  name: string;

  @IsNotEmpty()
  page: number;
}
