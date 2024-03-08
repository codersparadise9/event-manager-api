/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { ApplicationEnvironment } from '../../constants/env.constants';
import { configValidator } from './env-config-variables';
import { EnvConfigService } from './env-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: configValidator,
      cache: true,
      envFilePath:
        process.env.APP_ENV === ApplicationEnvironment.PROD ? '.prod.env' : '.dev.env' || '.test.env' || '.uat.env' || '.env',
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
