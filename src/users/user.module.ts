import { Module } from '@nestjs/common';

import UserController from './user.controller';
import UserService from './user.service';

import DatabaseModule from '../databases/database.module';
import AuthGuard from 'src/auth/guards/auth.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export default class UserModule {}
