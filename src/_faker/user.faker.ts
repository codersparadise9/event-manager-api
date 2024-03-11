import { User } from '../core/entities/user-entity';
import { Auth_Types } from '../constants/auth';
import { faker } from '@faker-js/faker';

export const generateFakeUser = (): User => {
  return {
    id: faker.string.uuid(),
    fullName: faker.internet.displayName(),
    email: faker.internet.email(),
    authType: Auth_Types.LOCAL,
    password: faker.internet.password(),
    subscription: [],
  };
};
