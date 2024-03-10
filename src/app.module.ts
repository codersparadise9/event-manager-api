/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configurations/configuration.module';
import { UsersModule } from './features/users/users.module';
import { CommonModule } from './common/common-module';

@Module({
  imports: [ConfigurationModule, CommonModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
