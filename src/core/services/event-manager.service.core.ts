/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { CreateEventDTO } from '../dtos/event-dto';
import { Event } from '../entities/event-entity';

export abstract class EventManagerServiceCore {
  abstract createEvent(createEventDTO: CreateEventDTO): Promise<Event>;

  abstract deleteEvent(eventID: string): Promise<Event>;

  abstract updateEvent(eventID: string, updateEventDTO: Partial<CreateEventDTO>): Promise<Event>;

  abstract subscribeEvent(eventID: string, userId: string): Promise<Event>;

  abstract unsubscribeEvent(eventID: string, userID: string): Promise<Event>;

  abstract getAllSubscribedEvents(userID: string): Promise<Event | null>;

  abstract getAllCreatedEvents(userID: string): Promise<Event[] | null>;

  abstract getAllActiveEvents(active: boolean): Promise<Event[]>;
}
