import { createParamDecorator } from "@nestjs/common";

describe('Decorator Test', () => {
  it('Decorator Test', () => {
    const User = createParamDecorator((data, ctx) => {
      return ctx.switchToHttp().getRequest().user;
    });
  });
});
