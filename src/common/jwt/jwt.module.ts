/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Global, Module } from '@nestjs/common';
import { JwtServiceCore } from '../../core/services/common/jwt-service.core';
import { JwtServiceImpl } from './jwt-service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
  ],
  providers: [
    {
      provide: JwtServiceCore,
      useClass: JwtServiceImpl,
    },
  ],
  exports: [JwtServiceCore],
})
export class JwtServiceModule {}
