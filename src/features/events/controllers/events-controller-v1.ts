/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/entities/event-entity';
import { GetUser } from '../../../common/auth/decorators/auth-decorator';
import { JWTUser } from '../../../core/dtos/auth-dto';
import { JWTAuthGuard } from '../../../common/auth/guards/jwt-auth.guard';
import { CreateEventDTO } from '../dtos/event-dtos';
import { UserService } from '../../../core/services/user.service';

@Controller('/event')
@UseInterceptors(ClassSerializerInterceptor)
export class EventsControllerV1 {
  constructor(
    private readonly _service: EventService,
    private readonly _userService: UserService,
  ) {}

  @Get()
  @UseGuards(JWTAuthGuard)
  async getAllCreatedEvents(@GetUser() user: JWTUser): Promise<Event[] | null> {
    return this._service.getAllCreatedEvents(user.id);
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  async getEventById(@GetUser() user: JWTUser, @Param('id') eventId: string): Promise<Event | Event[]> {
    return await this._service.getEventByFilter({ id: eventId }, user);
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  async createEvent(@GetUser() jwtUser: JWTUser, @Body() createEventDTO: CreateEventDTO): Promise<Event | Event[]> {
    const user = await this._userService.findByEmail(jwtUser.email);
    return await this._service.createEvent(user, createEventDTO);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  async updateEvent(
    @GetUser() jwtUser: JWTUser,
    @Param('id') eventId: string,
    @Body() updateDTO: Partial<CreateEventDTO>,
  ): Promise<Event | Event[]> {
    return await this._service.updateEvent(jwtUser.id, eventId, updateDTO);
  }
}
