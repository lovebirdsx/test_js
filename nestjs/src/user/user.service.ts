import { Injectable } from '@nestjs/common';
import { Role } from '../common/type';
import { SharedUser } from '../common/type';
import { FeishuProfile } from '../auth/feishu/feishu.auth.interface';

@Injectable()
export class UserService {
  private readonly _users: SharedUser[] = [
    {
      userId: 1,
      username: 'john',
      provider: 'local',
      providerId: '',
      password: 'changeme',
      role: Role.User,
    },
    {
      userId: 2,
      username: 'maria',
      provider: 'local',
      providerId: '',
      password: 'guess',
      role: Role.User,
    },
    {
      userId: 3,
      username: 'chris',
      provider: 'local',
      providerId: '',
      password: 'secret',
      role: Role.User,
    },
    {
      userId: 4,
      username: 'admin',
      provider: 'local',
      providerId: '',
      password: 'admin',
      role: Role.Admin,
    },
    {
      userId: 5,
      username: 'developer',
      provider: 'local',
      providerId: '',
      password: 'developer',
      role: Role.Developer,
    },
  ];

  async findOne(username: string): Promise<SharedUser | undefined> {
    return this._users.find((user) => user.username === username);
  }

  async findOrCreate(profile: FeishuProfile) {
    const user = this._users.find((user) => user.providerId === profile.openId);
    if (user) {
      return user;
    }

    const newUser: SharedUser = {
      userId: this._users.length + 1,
      username: profile.name,
      provider: 'lark',
      providerId: profile.openId,
      password: profile.openId,
      role: Role.User,
    };
    this._users.push(newUser);
    return newUser;
  }
}
