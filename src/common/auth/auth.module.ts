/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { AccessKeyStrategy } from './strategies/access-auth.strategy';
import { AuthServiceCore } from '../../core/services/common/auth-service.core';
import { AuthServiceV1 } from './services/auth.service-v1';
import { AuthControllerV1 } from './controller/auth.controller-v1';
import { UsersModule } from '../../features/users/users.module';
import { JwtServiceModule } from '../jwt/jwt.module';
import { RefreshKeyStrategy } from './strategies/refresh-auth.strategy';
import { UserVerifiedValidator } from './dtos/validators/user-activated.validator';
import { EmailRegisteredValidator } from './dtos/validators/email-registered.validator';
import { EmailNotFoundValidation } from './dtos/validators/email-not-found.validator';

@Module({
  imports: [PassportModule.register({ defaultStrategy: ['local-auth-strategy', 'jwt-auth-strategy'] }), UsersModule, JwtServiceModule],
  providers: [
    LocalStrategy,
    AccessKeyStrategy,
    RefreshKeyStrategy,
    {
      provide: AuthServiceCore,
      useClass: AuthServiceV1,
    },
    EmailRegisteredValidator,
    EmailNotFoundValidation,
    UserVerifiedValidator,
  ],
  controllers: [AuthControllerV1],
})
export class AuthModule {}
