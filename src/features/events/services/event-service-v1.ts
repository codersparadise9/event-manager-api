/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { BadRequestException, Injectable } from '@nestjs/common';
import { EventService } from '../../../core/services/event.service';
import { CreateEventDTOCore } from '../../../core/dtos/event-dto';
import { Event } from '../../../core/entities/event-entity';
import { EventRepository } from '../../../core/repositories/event-repository';
import { EventDtoEntityMapper } from '../mapper/event-dto-entity.mapper';
import { FindOptionsWhere } from 'typeorm';
import { User } from '../../../core/entities/user-entity';
import { TypeormEventEntity } from '../entities/typeorm-event.entity';
import { GetUser } from '../../../common/auth/decorators/auth-decorator';
import { JWTUser } from '../../../core/dtos/auth-dto';
import { validate } from 'uuid';

@Injectable()
export class EventServiceV1 implements EventService {
  constructor(private readonly _repository: EventRepository) {}

  async createEvent(user: User, createEventDTO: CreateEventDTOCore): Promise<Event | Event[]> {
    return await this._repository.create(EventDtoEntityMapper.mapCreateDTO(user, createEventDTO));
  }

  async deleteEvent(eventID: string): Promise<Event | Event[]> {
    if (eventID === null || eventID === undefined || !validate(eventID)) {
      throw new BadRequestException('id is not valid');
    }
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

  async updateEvent(userID: string, eventID: string, updateEventDTO: Partial<CreateEventDTOCore>): Promise<Event | Event[]> {
    if (eventID === null || eventID === undefined || !validate(eventID)) {
      throw new BadRequestException('id is not valid');
    }
    let event: Event | Event[] = await this._repository.findBy({
      owner: {
        id: userID,
      },
      id: eventID,
    });
    if (!event) {
      throw new BadRequestException('event not found ');
    } else {
      event = EventDtoEntityMapper.mapUpdateDTO(event, updateEventDTO);
      return await this._repository.update(event);
    }
  }

  async getEventByFilter(filter: Partial<Event>, @GetUser() jwtUser?: JWTUser): Promise<Event | Event[]> {
    let findOption: FindOptionsWhere<TypeormEventEntity>;

    if (jwtUser) {
      findOption = {
        owner: {
          id: jwtUser.id,
        },
        ...filter,
      };
    } else
      findOption = {
        ...filter,
      };
    return await this._repository.findBy(findOption);
  }
}
