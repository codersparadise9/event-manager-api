/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Global, Module } from '@nestjs/common';
import { TransactionManagerModule } from './transactions/transaction-manager.module';
import { PaginationModule } from './pagination/pagination.module';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtServiceModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [
    CacheModule.register({
      ttl: 3600, // seconds
      store: 'memory',
      isGlobal: true,
    }),
    JwtServiceModule,
    TransactionManagerModule,
    PaginationModule,
    AuthModule,
  ],
})
export class CommonModule {}
