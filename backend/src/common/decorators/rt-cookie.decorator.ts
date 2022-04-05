import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RtCookie = createParamDecorator(
  (_data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies['rt'];
  },
);
