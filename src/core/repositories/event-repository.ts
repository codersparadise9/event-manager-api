/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { GenericRepositoryCore } from './generic-repository.core';
import { Event } from '../entities/event-entity';

export abstract class EventRepository extends GenericRepositoryCore<Event> {
  abstract findBy(filter: any): Promise<Event[]>;
}
