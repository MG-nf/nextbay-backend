import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'; // Import the type
import { AuthenticatedUser } from './types/authenticated-user';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<Request>(); // Tell TS it's an Express Request
    const user = request.user as AuthenticatedUser; // Cast the user to your interface

    if (!user) {
      throw new Error('User not found in request (check JwtAuthGuard)');
    }

    return user;
  },
);
