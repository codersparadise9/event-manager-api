/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Auth_Types } from '../../constants/auth';
import { BaseEntity } from './base.entity';

export interface User extends BaseEntity {
  email: string;
  password: string;
  fullName: string;
  authType: Auth_Types;
}
