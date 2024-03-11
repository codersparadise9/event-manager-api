/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Global, Module } from '@nestjs/common';
import { TransactionManagerModule } from './transactions/transaction-manager.module';
import { PaginationModule } from './pagination/pagination.module';
import { JwtServiceModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';

@Global()
@Module({
  imports: [JwtServiceModule, TransactionManagerModule, PaginationModule, AuthModule, MailerModule],
})
export class CommonModule {}
