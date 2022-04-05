import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AtCookie = createParamDecorator(
  (_data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies['at'];
  },
);
