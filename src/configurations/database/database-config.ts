/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { EnvConfigService } from '../environment/env-config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeormUserEntity } from '../../features/users/entities/typeorm-user.entity';
import { TypeormEventEntity } from '../../features/events/entities/typeorm-event.entity';
import { TypeormSubscriptionEntity } from '../../features/subscriptions/entities/typeorm-subscription.entity';

export const typeormDatabaseConfig = async (config: EnvConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: config.DatabaseConfig.host,
  port: config.DatabaseConfig.port,
  username: config.DatabaseConfig.username,
  password: config.DatabaseConfig.password,
  database: config.DatabaseConfig.databaseName,
  entities: [TypeormUserEntity, TypeormEventEntity, TypeormSubscriptionEntity],
  synchronize: config.DatabaseConfig.synchronize,
  autoLoadEntities: false,
});
