import { InjectModel } from '@nestjs/sequelize';
import { ForbiddenException, Injectable } from '@nestjs/common';

import User from '../users/user.model';

import { UserInfoResponseInterface } from './interfaces/user-info.interface';

@Injectable()
export default class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async info(id: number): Promise<UserInfoResponseInterface> {
    const user = await this.findById(id);

    if (!user) {
      throw new ForbiddenException('FORBIDDEN');
    }

    return {
      user,
    };
  }

  findById(id: number) {
    return this.userModel.findOne({
      where: {
        id,
        is_deleted: false,
      },
      attributes: ['id', 'name', 'email'],
    });
  }
}
