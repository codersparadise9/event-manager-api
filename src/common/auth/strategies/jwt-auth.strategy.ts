/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../../core/services/user.service';
import { EnvConfigService } from '../../../configurations/environment/env-config.service';
import { JWTUser } from '../../../core/dtos/auth-dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-auth-strategy') {
  constructor(
    private usersService: UserService,
    configService: EnvConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.AuthConfig.jwtAccessSecret,
    });
  }

  async validate(payload: JWTUser) {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
