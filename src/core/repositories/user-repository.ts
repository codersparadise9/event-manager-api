/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { GenericRepositoryCore } from './generic-repository.core';
import { User } from '../entities/user-entity';

export abstract class UserRepository extends GenericRepositoryCore<User> {
  abstract findByEmail(email: string): Promise<User>;

  abstract findByEmailAndPassword(email: string, password: string): Promise<User>;
}
