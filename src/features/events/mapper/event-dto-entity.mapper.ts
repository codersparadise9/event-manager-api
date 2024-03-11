/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Event } from '../../../core/entities/event-entity';
import { User } from '../../../core/entities/user-entity';
import { CreateEventDTO } from '../dtos/event-dtos';

export class EventDtoEntityMapper {
  static mapCreateDTO(user: User, createDTO: CreateEventDTO): Omit<Event, 'id'> {
    return {
      active: true,
      description: createDTO.description,
      end: createDTO.end,
      location: createDTO.location,
      name: createDTO.name,
      owner: user,
      start: createDTO.start,
      subscription: [],
    };
  }

  static mapUpdateDTO(entity: Event | Event[], updateEntity: Partial<Event>): Event | Event[] {
    for (const property in updateEntity) {
      entity[property] = updateEntity[property];
    }
    return entity;
  }
}
