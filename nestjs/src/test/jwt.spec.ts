import { JwtService } from '@nestjs/jwt';

describe('jwt', () => {
  it('encode decode', () => {
    const user = {
      id: 1,
      name: 'test',
    };

    const jwtService = new JwtService({ secret: 'test' });
    const token = jwtService.sign(user);
    const decoded = jwtService.decode(token) as typeof user;
    expect(decoded.id).toBe(user.id);
    expect(decoded.name).toBe(user.name);
  });
});
