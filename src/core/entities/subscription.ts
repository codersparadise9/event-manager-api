/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { BaseEntity } from './base.entity';
import { User } from './user-entity';
import { Event } from './event-entity';

export interface Subscription extends BaseEntity {
  user: User;
  event: Event;
  subscriptionDate: Date;
}
