import { Injectable } from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private readonly _users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'chris',
      password: 'secret',
    },
    {
      userId: 4,
      username: 'admin',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this._users.find((user) => user.username === username);
  }
}
