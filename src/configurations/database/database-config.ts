/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { EnvConfigService } from '../environment/env-config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormDatabaseConfig = async (config: EnvConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: config.DatabaseConfig.host,
  port: config.DatabaseConfig.port,
  username: config.DatabaseConfig.username,
  password: config.DatabaseConfig.password,
  database: config.DatabaseConfig.databaseName,
  entities: [],
  synchronize: config.DatabaseConfig.synchronize,
  autoLoadEntities: false,
});
