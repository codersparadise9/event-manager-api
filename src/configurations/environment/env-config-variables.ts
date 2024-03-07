import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { DatabaseType } from 'typeorm';

export class EnvConfigVariables {
  @IsString()
  DATABASE_TYPE: DatabaseType;

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
}
