import { JwtPayload, sign, verify } from 'jsonwebtoken';
import environments from '../config/environments';

import { BearerTokenInterface } from '../auth/interfaces/token.interface';

import { ExpressRequest } from 'src/auth/interfaces/request.interface';

export default class AuthUtils {
  public static generateBearerToken(data: BearerTokenInterface): string {
    return sign(
      {
        iss: data.id,
        user: data,
      },
      environments.app_secret_key,
      {
        expiresIn: '24h',
      },
    );
  }

  public static getBearerToken(req: ExpressRequest): string {
    if (!req.headers.authorization) {
      return null;
    }

    const [, token] = req.headers.authorization.split('Bearer ');

    return token;
  }

  public static decryptToken(
    token: string,
    secretKey: string = environments.app_secret_key,
  ): JwtPayload | string {
    try {
      if (!token) {
        return null;
      }

      return verify(token, secretKey);
    } catch (error) {
      return null;
    }
  }
}
