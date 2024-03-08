/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from '../environment/env.module';
import { EnvConfigService } from '../environment/env-config.service';
import { typeormDatabaseConfig } from './database-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: typeormDatabaseConfig,
    }),
  ],
})
export default class DatabaseConfigModule {}
