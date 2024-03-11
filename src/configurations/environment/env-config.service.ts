/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './interfaces/database-config.interface';
import { AuthConfig } from './interfaces/auth-config.interface';
import { MailConfig } from './interfaces/mail-config.interface';

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
      jwtAccessSecret: this._configService.get('JWT_ACCESS_SECRET'),
      jwtRefreshSecret: this._configService.get('JWT_REFRESH_SECRET'),
      jwtEmailVerifySecret: this._configService.get('JWT_EMAIL_VERIFICATION_SECRET'),
    };
  }

  get MailConfig(): MailConfig {
    return <MailConfig>{
      auth: { pass: this._configService.get('MAILER_PASSWORD'), user: this._configService.get('MAILER_USERNAME') },
      host: this._configService.get('MAILER_HOST'),
    };
  }
}
