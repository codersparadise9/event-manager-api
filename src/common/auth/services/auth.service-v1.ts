/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServiceCore } from '../../../core/services/common/auth-service.core';
import { AuthResponseDTO, JWTUser, LocalAuthLoginDTO, LocalAuthSignupDTO } from '../../../core/dtos/auth-dto';
import { JwtServiceCore } from '../../../core/services/common/jwt-service.core';
import { EnvConfigService } from '../../../configurations/environment/env-config.service';
import { UserService } from '../../../core/services/user.service';
import * as bcrypt from 'bcrypt';
import { Auth_Types } from '../../../constants/auth';
import { isArray } from 'class-validator';

@Injectable()
export class AuthServiceV1 implements AuthServiceCore {
  constructor(
    private readonly jwtService: JwtServiceCore,
    private readonly configService: EnvConfigService,
    private readonly userService: UserService,
  ) {}

  async refreshToken(jwtUser: JWTUser): Promise<AuthResponseDTO> {
    return await this.jwtService.refreshAccessToken(jwtUser);
  }

  async login(loginDTO?: LocalAuthLoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userService.findByEmail(loginDTO.email);
    if (user && (await bcrypt.compare(loginDTO.password, user.password))) {
      return this.generateTokens(user);
    } else {
      throw new UnauthorizedException('email or password is not correct');
    }
  }

  async logout(accessToken?: string): Promise<boolean> {
    if (accessToken) {
      const user = await this.jwtService.validateToken(accessToken, this.configService.AuthConfig.jwtAccessSecret);
      if (user) {
        return true;
      } else {
        throw new UnauthorizedException('user not signed in');
      }
    }
    return false;
  }

  async signup(authType: Auth_Types, signUpDTO?: LocalAuthSignupDTO): Promise<AuthResponseDTO> {
    const isExistingUser = await this.userService.findByEmail(signUpDTO.email);
    if (isExistingUser) throw new BadRequestException('user already exists');
    signUpDTO.password = await bcrypt.hash(signUpDTO.password, 10);
    const newUser = await this.userService.createUser(authType, signUpDTO);
    const user = isArray(newUser) ? newUser[0] : newUser;
    return await this.generateTokens({ email: user.email, id: user.id, fullName: user.fullName });
  }

  private async generateTokens(user: JWTUser): Promise<AuthResponseDTO> {
    const accessToken = await this.jwtService.signToken(
      { email: user.email, fullName: user.fullName, id: user.id } as JWTUser,
      this.configService.AuthConfig.jwtAccessSecret,
      '1h',
    );
    const refreshToken = await this.jwtService.signToken(
      { email: user.email, fullName: user.fullName, id: user.id } as JWTUser,
      this.configService.AuthConfig.jwtRefreshSecret,
      '1d',
    );
    return { accessToken, refreshToken };
  }
}
