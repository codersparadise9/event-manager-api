import { CreateEventDTO } from '../../../core/dtos/event-dto';
import { Event } from '../../../core/entities/event-entity';
import { User } from '../../../core/entities/user-entity';

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
    };
  }
}
