/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configurations/configuration.module';
import { CommonModule } from './common/common-module';
import { FeatureModule } from './features/feature.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 3600, // seconds
      isGlobal: true,
    }),
    ConfigurationModule,
    CommonModule,
    FeatureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
