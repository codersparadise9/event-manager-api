/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtServiceCore } from '../../core/services/common/jwt-service.core';
import { AuthResponseDTO, JWTUser } from '../../core/dtos/auth-dto';
import { Cache } from 'cache-manager';
import { EnvConfigService } from '../../configurations/environment/env-config.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceImpl implements JwtServiceCore {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: EnvConfigService,
  ) {}

  async signToken(payload: JWTUser, key: string, exp: string): Promise<string> {
    const data = { ...payload, sub: payload.id };
    return this.jwtService.sign(data, { secret: key, expiresIn: exp });
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthResponseDTO> {
    const user = await this.validateToken(refreshToken, this.configService.AuthConfig.jwtRefreshSecret);
    try {
      const cachedToken = await this.cacheManager.get(user.id);
      if (refreshToken === cachedToken) {
        if (cachedToken) {
          return {
            accessToken: await this.signToken(user, this.configService.AuthConfig.jwtAccessSecret, '1h'),
            refreshToken: await this.signToken(user, this.configService.AuthConfig.jwtRefreshSecret, '1D'),
          };
        }
      } else {
        throw new UnauthorizedException('please login again');
      }
    } catch (error) {
      console.log('error = ', error);
    }
  }

  async validateToken(token: string, key: string): Promise<JWTUser> {
    try {
      const payload: JWTUser = this.jwtService.verify<JWTUser>(token, { secret: key });
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
