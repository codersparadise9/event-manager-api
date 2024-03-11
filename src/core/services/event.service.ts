/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { CreateEventDTOCore } from '../dtos/event-dto';
import { Event } from '../entities/event-entity';
import { User } from '../entities/user-entity';
import { JWTUser } from '../dtos/auth-dto';

export abstract class EventService {
  abstract createEvent(user: User, createEventDTO: CreateEventDTOCore): Promise<Event | Event[]>;

  abstract deleteEvent(eventID: string): Promise<Event | Event[]>;

  abstract updateEvent(userID: string, eventID: string, updateEventDTO: Partial<CreateEventDTOCore>): Promise<Event | Event[]>;

  abstract getAllCreatedEvents(userID: string): Promise<Event[] | null>;

  abstract getAllActiveEvents(userID: string): Promise<Event[]>;

  abstract getEventByFilter(filter: any, user?: JWTUser): Promise<Event | Event[]>;

  abstract getEventByID(id: string): Promise<Event>;
}
