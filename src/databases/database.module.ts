// database/database.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { databaseConfig } from '../databases/database.config';

import UserModel from '../users/user.model'; // Import your models here
import FinanceModel from '../finance/models/finance.model'; // Import your models here
import FinanceProductModel from '../finance/models/finance-product.model'; // Import your models here
import CustomerModel from '../customer/customer.model'; // Import your models here
import ProductModel from '../product/product.model'; // Import your models here

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    SequelizeModule.forFeature([
      UserModel,
      FinanceModel,
      FinanceProductModel,
      CustomerModel,
      ProductModel,
    ]),
  ],
  exports: [SequelizeModule],
})
export default class DatabaseModule {}
