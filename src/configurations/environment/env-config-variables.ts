/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class EnvConfigVariables {
  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_HOST: string;

  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  JWT_KEY: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  GOOGLE_CALLBACK_URI: string;
}

export const configValidator = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvConfigVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
