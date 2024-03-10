/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { User } from '../../../core/entities/user-entity';
import { Event } from '../../../core/entities/event-entity';
import { SubscriptionRepository } from '../../../core/repositories/subscription-repository';
import { Subscription } from '../../../core/entities/subscription';

@Injectable()
export class SubscriptionServiceV1 implements SubscriptionService {
  constructor(private readonly _repository: SubscriptionRepository<Subscription>) {}

  async subscribeEvent(user: User, event: Event): Promise<Subscription | Subscription[]> {
    return await this._repository.create({ user: user, event: event, subscriptionDate: new Date() });
  }

  async unSubscribeEvent(user: User, event: Event): Promise<Subscription> {
    const subscription = await this._repository.findBy({ user, event });
    if (subscription.length > 0) {
      await this._repository.delete(subscription[0].id);
      return subscription[0];
    }
  }
}
