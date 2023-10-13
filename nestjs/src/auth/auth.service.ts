import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.interface';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  async validateUser(name: string, pwd: string): Promise<Omit<User, 'password'>> {
    const user = await this._usersService.findOne(name);
    if (!user || user.password !== pwd) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
