/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { UserRepository } from '../../../core/repositories/user-repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users.module';
import DatabaseConfigModule from '../../../configurations/database/database-config.module';
import { CommonModule } from '../../../common/common-module';
import { generateFakeUser } from '../../../_faker/user.faker';

describe('Test UserRepository', () => {
  let userRepository: UserRepository;
  let module: TestingModule;
  const fakeUser = generateFakeUser();

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule, DatabaseConfigModule, CommonModule],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });
  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('findByEmailAndPassword', () => {
    it('should return user details with given email and password', async () => {
      const userOrUsers = await userRepository.create(fakeUser);
      const user = Array.isArray(userOrUsers) ? userOrUsers[0] : userOrUsers;
      // If no user is returned or created
      if (!user) throw new Error('User creation failed');

      const result = await userRepository.findByEmailAndPassword(fakeUser.email, fakeUser.password);
      // Expect user to be found
      expect(result).toEqual(user);
    });
    it('should return null for wrong email and password', async () => {
      const userOrUsers = await userRepository.create(fakeUser);
      const user = Array.isArray(userOrUsers) ? userOrUsers[0] : userOrUsers;
      if (!user) throw new Error('User creation failed');
      const result = await userRepository.findByEmailAndPassword('wrong-email@example.com', 'wrongPassword');

      // Expect no user to be found
      expect(result).toBeNull();
    });
  });
  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const userOrUsers = await userRepository.create(fakeUser);

      const user = Array.isArray(userOrUsers) ? userOrUsers[0] : userOrUsers;

      if (!user) throw new Error('User creation failed');

      const result = await userRepository.findByEmail(fakeUser.email);

      // Expect user to be found
      expect(result).toEqual(user);
    });

    it('should return null for non existing email', async () => {
      const result = await userRepository.findByEmail('non-existing-email@example.com');

      // Expect no user to be found
      expect(result).toBeNull();
    });
  });
});
