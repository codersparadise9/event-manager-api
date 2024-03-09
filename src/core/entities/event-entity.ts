/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { User } from './user-entity';

export interface Event {
  id: string;
  name: string;
  location: string;
  start: Date;
  end: Date;
  description: string;
  owner: User;
  participants: User[];
  active: boolean;
}
