/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { AuthServiceCore } from '../../core/services/common/auth-service.core';
import { AuthServiceV1 } from './services/auth.service-v1';
import { AuthControllerV1 } from './controller/auth.controller-v1';
import { UsersModule } from '../../features/users/users.module';
import { JwtServiceModule } from '../jwt/jwt.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: ['local-auth-strategy', 'jwt-auth-strategy'] }),
    UsersModule,
    JwtServiceModule,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: AuthServiceCore,
      useClass: AuthServiceV1,
    },
  ],
  controllers: [AuthControllerV1],
})
export class AuthModule {}
