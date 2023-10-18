import { Injectable } from '@nestjs/common';
import { Role } from '../common/type';
import { SharedUser } from '../common/type';

@Injectable()
export class UserService {
  private readonly _users: SharedUser[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      role: Role.User,
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      role: Role.User,
    },
    {
      userId: 3,
      username: 'chris',
      password: 'secret',
      role: Role.User,
    },
    {
      userId: 4,
      username: 'admin',
      password: 'admin',
      role: Role.Admin,
    },
    {
      userId: 5,
      username: 'developer',
      password: 'developer',
      role: Role.Developer,
    },
  ];

  async findOne(username: string): Promise<SharedUser | undefined> {
    return this._users.find((user) => user.username === username);
  }
}
