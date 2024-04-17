import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { ExpressRequest } from '../auth/interfaces/request.interface';

const UserDecorator = createParamDecorator(
  (data: string | null, ctx: ExecutionContext) => {
    const req: ExpressRequest = ctx.switchToHttp().getRequest();

    if (!req.user) {
      return null;
    }

    if (data) {
      return req.user[data];
    }

    return req.user;
  },
);

export default UserDecorator;
