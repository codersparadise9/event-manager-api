import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { ApplicationEnvironment } from '../../constants/env.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.APP_ENV === ApplicationEnvironment.DEV
          ? '.dev.env'
          : '.prod.env',
    }),
  ],
})
export class EnvConfigModule {}
