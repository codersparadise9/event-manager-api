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
}
