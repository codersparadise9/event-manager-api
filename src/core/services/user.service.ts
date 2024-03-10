/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { CreateUserDtoCore, CreateUserResponseDTOCore } from '../dtos/user-dto';
import { User } from '../entities/user-entity';
import { Auth_Types } from '../../constants/auth';
import { PaginatedResponse } from '../dtos/paginated-response-dto';

export abstract class UserService {
  abstract createUser(
    authType: Auth_Types,
    createUserDTO: CreateUserDtoCore,
  ): Promise<CreateUserResponseDTOCore | CreateUserResponseDTOCore[]>;

  abstract findByEmail(email: string): Promise<User>;

  abstract findByEmailAndPassword(email: string, password: string): Promise<User>;

  abstract find(page: number, limit: number): Promise<PaginatedResponse<User>>;
}
