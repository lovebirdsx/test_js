import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { SharedUser } from '../common/type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(name: string, pwd: string): Promise<Omit<SharedUser, 'password'>> {
    const user = await this._usersService.findOne(name);
    if (!user || user.password !== pwd) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(user: SharedUser) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
