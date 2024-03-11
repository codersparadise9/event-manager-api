import { Module } from '@nestjs/common';
import { EventModules } from './events/event.modules';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventModules, SubscriptionModule, UsersModule],
})
export class FeatureModule {}
