/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { BadRequestException, Injectable } from '@nestjs/common';
import { EventService } from '../../../core/services/event.service';
import { CreateEventDTO } from '../../../core/dtos/event-dto';
import { Event } from '../../../core/entities/event-entity';
import { EventRepository } from '../../../core/repositories/event-repository';
import { EventDtoEntityMapper } from '../mapper/event-dto-entity.mapper';
import { FindOptionsWhere } from 'typeorm';
import { User } from '../../../core/entities/user-entity';

@Injectable()
export class EventServiceV1 implements EventService {
  constructor(private readonly _repository: EventRepository<Event>) {}

  async createEvent(user: User, createEventDTO: CreateEventDTO): Promise<Event | Event[]> {
    return await this._repository.create(EventDtoEntityMapper.mapCreateDTO(user, createEventDTO));
  }

  async deleteEvent(eventID: string): Promise<Event | Event[]> {
    return await this._repository.delete(eventID);
  }

  async getAllActiveEvents(userId: string): Promise<Event[]> {
    const options: FindOptionsWhere<Event> = {
      active: true,
      owner: {
        id: userId,
      },
    };
    return await this._repository.findBy(options);
  }

  async getAllCreatedEvents(userID: string): Promise<Event[] | null> {
    const options: FindOptionsWhere<Event> = {
      owner: {
        id: userID,
      },
    };
    return await this._repository.findBy(options);
  }

  async updateEvent(eventID: string, updateEventDTO: Partial<CreateEventDTO>): Promise<Event | Event[]> {
    const event = await this._repository.findByID(eventID);
    if (!event) {
      throw new BadRequestException('event not found ');
    }
    const updatedEvent = { ...event, ...updateEventDTO };
    return await this._repository.update(updatedEvent);
  }
}
