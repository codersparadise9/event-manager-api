/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/entities/event-entity';
import { GetUser } from '../../../common/auth/decorators/auth-decorator';
import { JWTUser } from '../../../core/dtos/auth-dto';
import { AccessTokenGuard } from '../../../common/auth/guards/access-token.guard';
import { CreateEventDTO } from '../dtos/event-dtos';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from '../../../core/entities/subscription';
import { SubscriptionService } from '../../../core/services/subscription.service';

@Controller('/event')
@UseInterceptors(ClassSerializerInterceptor)
export class EventsControllerV1 {
  constructor(
    private readonly _service: EventService,
    private readonly _userService: UserService,
    private readonly _subscriptionService: SubscriptionService,
  ) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getAllCreatedEvents(@Query('active') isActive: boolean, @GetUser() user: JWTUser): Promise<Event[] | Event> {
    if (isActive !== undefined) {
      return this._service.getEventByFilter(
        {
          active: isActive,
        },
        user,
      );
    } else {
      return this._service.getAllCreatedEvents(user.id);
    }
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async getEventById(@GetUser() user: JWTUser, @Param('id') eventId: string): Promise<Event | Event[]> {
    return await this._service.getEventByFilter({ id: eventId }, user);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  async createEvent(@GetUser() jwtUser: JWTUser, @Body() createEventDTO: CreateEventDTO): Promise<Event | Event[]> {
    const user = await this._userService.findByEmail(jwtUser.email);
    return await this._service.createEvent(user, createEventDTO);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  async updateEvent(@GetUser() jwtUser: JWTUser, @Param('id') eventId: string, @Body() updateDTO: Partial<CreateEventDTO>): Promise<Event | Event[]> {
    return await this._service.updateEvent(jwtUser.id, eventId, updateDTO);
  }

  @Post(':id/subscribe')
  @UseGuards(AccessTokenGuard)
  async subscribeEvent(@Param('id') eventID: string, @GetUser() jwtUser: JWTUser): Promise<Subscription | Subscription[]> {
    const event = await this._service.getEventByID(eventID);
    const user = await this._userService.findByEmail(jwtUser.email);
    console.log(event);
    if (event.owner.id === jwtUser.id) {
      throw new BadRequestException('owner cannot subscribe to owned events');
    }
    return await this._subscriptionService.subscribeEvent(user, event);
  }

  @Post(':id/unsubscribe')
  @UseGuards(AccessTokenGuard)
  async unSubscribeEvent(@Param('id') eventID: string, @GetUser() jwtUser: JWTUser): Promise<Subscription | Subscription[]> {
    const event = await this._service.getEventByID(eventID);
    const user = await this._userService.findByEmail(jwtUser.email);
    if (event.owner.id === jwtUser.id) {
      throw new BadRequestException('owner cannot subscribe to owned events');
    }
    return await this._subscriptionService.unSubscribeEvent(user, event);
  }
}
