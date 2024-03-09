/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { CreateUserDto } from '../dtos/user-dto';
import { User } from '../entities/user-entity';

export abstract class UserService {
  abstract createUser(createUserDTO: CreateUserDto): Promise<User>;
}
