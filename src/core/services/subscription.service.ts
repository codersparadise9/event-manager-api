/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { User } from '../entities/user-entity';
import { Event } from '../entities/event-entity';
import { Subscription } from '../entities/subscription';

export abstract class SubscriptionService {
  abstract subscribeEvent(user: User, event: Event): Promise<Subscription | Subscription[]>;

  abstract unSubscribeEvent(user: User, event: Event): Promise<Subscription | Subscription[]>;
}
