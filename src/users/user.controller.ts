import { Controller, Get, UseGuards } from '@nestjs/common';

import UserService from './user.service';
import AuthGuard from 'src/auth/guards/auth.guard';
import User from '../decorators/user.decorator';

import { UserInfoResponseInterface } from './interfaces/user-info.interface';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  @UseGuards(AuthGuard)
  getInfo(@User('id') id: number): Promise<UserInfoResponseInterface> {
    return this.userService.info(id);
  }
}
