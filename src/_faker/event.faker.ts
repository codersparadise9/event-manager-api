import { CreateEventDTOCore } from '../core/dtos/event-dto';
import { faker } from '@faker-js/faker';

export const generateFakeEvent = (): CreateEventDTOCore => {
  return {
    description: faker.string.sample(),
    end: faker.date.anytime(),
    location: faker.location.city(),
    name: faker.string.sample(),
    start: faker.date.anytime(),
  };
};
