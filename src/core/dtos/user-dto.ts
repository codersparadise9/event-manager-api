/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */
import { Auth_Types } from '../../constants/auth';

export interface CreateUserDtoCore {
  email: string;
  fullName: string;
  password: string;
}

export interface CreateUserResponseDTOCore {
  id: string;
  email: string;
  fullName: string;
  authType: Auth_Types;
}
