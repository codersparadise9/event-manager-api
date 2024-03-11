/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { User } from '../entities/user-entity';
import { Event } from '../entities/event-entity';
import { Subscription } from '../entities/subscription';
import { JWTUser } from '../dtos/auth-dto';

export abstract class SubscriptionService {
  abstract subscribeEvent(user: User, event: Event): Promise<Subscription | Subscription[]>;

  abstract unSubscribeEvent(user: User, event: Event): Promise<Subscription | Subscription[]>;

  abstract findByFilter(filter: any, user?: JWTUser): Promise<Subscription | Subscription[]>;
}
