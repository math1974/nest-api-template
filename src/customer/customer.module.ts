import { Module } from '@nestjs/common';

import CustomerController from './customer.controller';
import CustomerService from './customer.service';

import DatabaseModule from '../databases/database.module';
import AuthGuard from 'src/auth/guards/auth.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService, AuthGuard],
  exports: [CustomerService],
})
export default class CustomerModule {}
