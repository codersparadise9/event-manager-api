/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { CreateEventDTO } from '../dtos/event-dto';
import { Event } from '../entities/event-entity';
import { User } from '../entities/user-entity';

export abstract class EventService {
  abstract createEvent(user: User, createEventDTO: CreateEventDTO): Promise<Event | Event[]>;

  abstract deleteEvent(eventID: string): Promise<Event | Event[]>;

  abstract updateEvent(eventID: string, updateEventDTO: Partial<CreateEventDTO>): Promise<Event | Event[]>;

  abstract getAllCreatedEvents(userID: string): Promise<Event[] | null>;

  abstract getAllActiveEvents(userID: string): Promise<Event[]>;
}
