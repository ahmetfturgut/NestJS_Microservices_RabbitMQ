import { createParamDecorator, ExecutionContext } from '@nestjs/common';  
import { AuthenticatedUserDto } from 'src/auth/authenticated-user.dto';
 
export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) : AuthenticatedUserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);