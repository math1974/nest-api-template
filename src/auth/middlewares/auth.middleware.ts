import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { AuthUtils } from '../../utils';
import UserService from '../../users/user.service';
import UserModel from '../../users/user.model';
import { ExpressRequest } from '../interfaces/request.interface';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const token: string = AuthUtils.getBearerToken(req);

      const decodedToken: JwtPayload | string = AuthUtils.decryptToken(token);

      if (
        decodedToken &&
        typeof decodedToken !== 'string' &&
        decodedToken.iss
      ) {
        const user: UserModel = await this.userService.findById(
          ~~decodedToken.iss,
        );

        req.user = user;
      }
    } else {
      req.user = null;
    }

    next();
  }
}
