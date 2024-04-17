import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '../users/user.model';
import { LoginResponseInterface } from './interfaces/login.interface';
import { AuthUtils } from 'src/utils';
import { BearerTokenInterface } from './interfaces/token.interface';

interface AuthUser extends User {
  isFake?: boolean;
}

@Injectable()
export default class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findUserByEmail(email: string): Promise<AuthUser> {
    const fakeUser = {
      password: '$2b$10$3',
      isFake: true,
    };

    const user = await this.userModel.findOne({
      where: {
        email,
      },
      raw: true,
      attributes: ['id', 'password'],
    });

    return (user || fakeUser) as AuthUser;
  }

  comparePassword(userPassword, password): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  async login({ email, password }): Promise<LoginResponseInterface> {
    const user = await this.findUserByEmail(email);

    const isSamePassword = this.comparePassword(user.password, password);

    if (user.isFake || !isSamePassword) {
      throw new NotFoundException('NOT FOUND');
    }

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
    } as BearerTokenInterface;

    return {
      token: AuthUtils.generateBearerToken(tokenData),
    };
  }
}
