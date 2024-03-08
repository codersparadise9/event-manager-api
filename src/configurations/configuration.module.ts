/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { EnvConfigModule } from './environment/env.module';
import { LoggerModule } from './logger/logger.module';
import DatabaseConfigModule from './database/database-config.module';

@Module({
  imports: [EnvConfigModule, LoggerModule, DatabaseConfigModule],
})
export class ConfigurationModule {}
