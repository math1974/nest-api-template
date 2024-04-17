import { Module } from '@nestjs/common';

import FinanceController from './finance.controller';
import FinanceService from './finance.service';

import DatabaseModule from '../databases/database.module';
import AuthGuard from 'src/auth/guards/auth.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [FinanceController],
  providers: [FinanceService, AuthGuard],
  exports: [FinanceService],
})
export default class FinanceModule {}
