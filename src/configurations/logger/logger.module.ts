/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as process from 'process';
import { ApplicationEnvironment } from '../../constants/env.constants';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      transports: [
        process.env.NODE_ENV !== ApplicationEnvironment.PROD
          ? new winston.transports.Console()
          : new winston.transports.File({ filename: 'logs/application.log' }),
      ],
    }),
  ],
})
export class LoggerModule {}
