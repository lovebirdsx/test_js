import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FeishuProfile } from './feishu.auth.interface';
import { ConfigService } from '@nestjs/config';
import { SharedUser } from '../../common/type';
import { UserService } from '../../user/user.service';

const FEISHU_PASSPORT_HOST = 'https://passport.feishu.cn/suite/passport/oauth/';

function genUrl(uri: string): string {
  return `${FEISHU_PASSPORT_HOST}${uri}`;
}

interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

@Injectable()
export class FeishuAuthService {
  private readonly _appId: string;
  private readonly _appSecret: string;

  constructor(
    private readonly _config: ConfigService,
    private readonly _userService: UserService,
  ) {
    this._appId = this._config.get('FEISHU_APP_ID');
    this._appSecret = this._config.get('FEISHU_APP_SECRET');
  }

  async getTokenInfo(code: string, redirectUri: string): Promise<TokenInfo | undefined> {
    const params = {
      client_id: this._appId,
      client_secret: this._appSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code,
    };

    const response = await axios.post(genUrl('token'), params, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = response.data;
    if (!data.access_token || !data.refresh_token || !data.token_type) {
      return undefined;
    }

    const tokenInfo: TokenInfo = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      tokenType: data.token_type,
    };

    return tokenInfo;
  }

  async getUserInfo(token: TokenInfo): Promise<FeishuProfile | undefined> {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `${token.tokenType} ${token.accessToken}`,
    };

    try {
      const response = await axios.get(genUrl('userinfo'), { headers });
      const userInfoObj = response.data;

      const qrUserInfo: FeishuProfile = {
        sub: userInfoObj.sub,
        name: userInfoObj.name,
        enName: userInfoObj.en_name,
        avatarThumb: userInfoObj.avatar_thumb,
        avatarMiddle: userInfoObj.avatar_middle,
        avatarBig: userInfoObj.avatar_big,
        openId: userInfoObj.open_id,
        unionId: userInfoObj.union_id,
        tenantKey: userInfoObj.tenant_key,
        avatarUrl: userInfoObj.avatar_url,
        picture: userInfoObj.picture,
      };

      return qrUserInfo;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async validateUser(code: string, redirectUrl: string): Promise<SharedUser | undefined> {
    const tokenInfo = await this.getTokenInfo(code, redirectUrl);
    if (!tokenInfo) {
      return undefined;
    }

    const userInfo = await this.getUserInfo(tokenInfo);
    if (!userInfo) {
      return undefined;
    }

    return this._userService.findOrCreate(userInfo);
  }
}
