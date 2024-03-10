/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { User } from './user-entity';
import { BaseEntity } from './base.entity';

export interface Event extends BaseEntity {
  name: string;
  location: string;
  start: Date;
  end: Date;
  description: string;
  owner: User;
  active: boolean;
}
