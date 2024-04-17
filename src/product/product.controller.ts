import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import ProductService from './product.service';
import AuthGuard from 'src/auth/guards/auth.guard';

import User from '../decorators/user.decorator';

import { ListProductResponseInterface } from './interfaces/list-product.interface';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import ListCustomerDto from './dtos/list-product.dto';
import Product from './product.model';

@UseGuards(AuthGuard)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('products')
export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: CreateProductDto): Promise<boolean> {
    return this.productService.create(product);
  }

  @Put('/:id')
  update(
    @Param('id') productId: number,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    const options = {
      filter: {
        id: productId,
      },
      changes: product,
    };

    return this.productService.update(options);
  }

  @Delete('/:id')
  remove(@Param('id') productId: number): Promise<boolean> {
    return this.productService.remove(productId);
  }

  @Get('/:id')
  find(@Param('id') productId: number): Promise<Product> {
    return this.productService.findById(productId);
  }

  @Get()
  async list(
    @Query() filter: ListCustomerDto,
  ): Promise<ListProductResponseInterface> {
    return this.productService.list(filter);
  }
}
