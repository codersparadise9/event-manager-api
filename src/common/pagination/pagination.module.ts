/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Global, Module } from '@nestjs/common';
import { PaginationServiceCore } from '../../core/services/common/pagination.service.core';
import { TypeormPaginationService } from './typeorm-pagination.service';

@Global()
@Module({
  providers: [
    {
      provide: PaginationServiceCore,
      useClass: TypeormPaginationService,
    },
  ],
  exports: [PaginationServiceCore],
})
export class PaginationModule {}
