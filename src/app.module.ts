import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import AppController from './app.controller';
import AppService from './app.service';

import DatabaseModule from './databases/database.module';
import AuthModule from './auth/auth.module';
import UserModule from './users/user.module';
import AuthMiddleware from './auth/middlewares/auth.middleware';
import FinanceModule from './finance/finance.module';
import CustomerModule from './customer/customer.module';
import ProductModule from './product/product.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    FinanceModule,
    CustomerModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule],
})
export default class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
