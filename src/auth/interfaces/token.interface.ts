import { JwtPayload } from 'jsonwebtoken';

export type BearerTokenInterface = {
  id: number;
  name: string;
  email: string;
};

export interface JwtPayloadInterface extends JwtPayload {
  user: BearerTokenInterface;
}
