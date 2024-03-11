/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { CreateUserDTO } from '../user.dto';
import { User } from '../../../../core/entities/user-entity';
import { Auth_Types } from '../../../../constants/auth';

export class UserDTOMapper {
  static mapCreateDTO(createDTO: CreateUserDTO, authType: Auth_Types): Omit<User, 'id'> {
    return {
      authType: authType,
      email: createDTO.email,
      fullName: createDTO.fullName,
      password: createDTO.password,
      subscription: [],
    };
  }
}
