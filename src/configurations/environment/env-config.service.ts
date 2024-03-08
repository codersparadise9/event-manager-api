/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './interfaces/database-config.interface';
import { AuthConfig } from './interfaces/auth-config.interface';

@Injectable()
export class EnvConfigService {
  constructor(private readonly _configService: ConfigService) {}

  get DatabaseConfig(): DatabaseConfig {
    return <DatabaseConfig>{
      databaseName: this._configService.get('DATABASE_NAME'),
      host: this._configService.get('DATABASE_HOST'),
      password: this._configService.get('DATABASE_PASSWORD'),
      port: this._configService.get('DATABASE_PORT') as number,
      synchronize: this._configService.get('DATABASE_SYNCHRONIZE') as boolean,
      username: this._configService.get('DATABASE_USERNAME'),
    };
  }

  get AuthConfig(): AuthConfig {
    return <AuthConfig>{
      googleOAuth2: {
        clientID: this._configService.get('GOOGLE_CLIENT_ID'),
        clientSecret: this._configService.get('GOOGLE_CLIENT_SECRET'),
        callbackURI: this._configService.get('GOOGLE_CALLBACK_URI'),
      },
      jwtKey: this._configService.get('JWT_KEY'),
      jwtSecret: this._configService.get('JWT_SECRET'),
    };
  }
}
