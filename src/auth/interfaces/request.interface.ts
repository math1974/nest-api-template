import UserModel from '../../users/user.model';
import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: UserModel;
}
