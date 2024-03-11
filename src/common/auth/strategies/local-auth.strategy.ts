/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServiceCore } from '../../../core/services/common/auth-service.core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-auth-strategy') {
  constructor(private authService: AuthServiceCore) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.login({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
