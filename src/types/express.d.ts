import { AuthenticatedUser } from 'src/auth/types/authenticated-user';

declare module 'express' {
  export interface Request {
    user?: AuthenticatedUser;
  }
}
