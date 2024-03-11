/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormSubscriptionEntity } from './entities/typeorm-subscription.entity';
import { SubscriptionService } from '../../core/services/subscription.service';
import { SubscriptionServiceV1 } from './services/subscription-service-v1';
import { SubscriptionRepository } from '../../core/repositories/subscription-repository';
import { TypeormSubscriptionRepository } from './repositories/typeorm-subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeormSubscriptionEntity])],
  providers: [
    {
      provide: SubscriptionService,
      useClass: SubscriptionServiceV1,
    },
    {
      provide: SubscriptionRepository,
      useClass: TypeormSubscriptionRepository,
    },
  ],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
