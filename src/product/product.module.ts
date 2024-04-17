import { Module } from '@nestjs/common';

import ProductController from './product.controller';
import ProductService from './product.service';

import DatabaseModule from '../databases/database.module';
import AuthGuard from 'src/auth/guards/auth.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, AuthGuard],
  exports: [ProductService],
})
export default class ProductModule {}
