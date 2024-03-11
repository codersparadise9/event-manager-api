/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtServiceCore } from '../../core/services/common/jwt-service.core';
import { AuthResponseDTO, JWTUser } from '../../core/dtos/auth-dto';
import { EnvConfigService } from '../../configurations/environment/env-config.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceImpl implements JwtServiceCore {
  constructor(
    private jwtService: JwtService,
    private readonly configService: EnvConfigService,
  ) {}

  async signToken(payload: JWTUser, key: string, exp: string): Promise<string> {
    const data = { ...payload, sub: payload.id };
    return this.jwtService.sign(data, { secret: key, expiresIn: exp });
  }

  async refreshAccessToken(user: JWTUser): Promise<AuthResponseDTO> {
    try {
      return {
        accessToken: await this.signToken(user, this.configService.AuthConfig.jwtAccessSecret, '1h'),
        refreshToken: await this.signToken(user, this.configService.AuthConfig.jwtRefreshSecret, '1D'),
      };
    } catch (error) {
      throw new UnauthorizedException('please login again');
    }
  }

  async validateToken(token: string, key: string): Promise<JWTUser> {
    try {
      return this.jwtService.verify<JWTUser>(token, { secret: key });
    } catch (e) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
