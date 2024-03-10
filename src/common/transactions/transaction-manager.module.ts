/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Global, Module } from '@nestjs/common';
import { TransactionManagerCore } from '../../core/services/common/transaction-manager.core';
import { TypeormTransactionManager } from './typeorm-transaction.service';

@Global()
@Module({
  providers: [
    {
      provide: TransactionManagerCore,
      useClass: TypeormTransactionManager,
    },
  ],
  exports: [TransactionManagerCore],
})
export class TransactionManagerModule {}
