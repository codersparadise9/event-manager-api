/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { EventsControllerV1 } from './controllers/events-controller-v1';
import { EventService } from '../../core/services/event.service';
import { EventRepository } from '../../core/repositories/event-repository';
import { TypeormEventEntity } from './entities/typeorm-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventServiceV1 } from './services/event-service-v1';
import { TypeormEventRepository } from './repositories/typeorm-event.repository';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [EventsControllerV1],
  imports: [TypeOrmModule.forFeature([TypeormEventEntity]), UsersModule],
  providers: [
    {
      provide: EventService,
      useClass: EventServiceV1,
    },
    {
      provide: EventRepository,
      useClass: TypeormEventRepository,
    },
  ],
  exports: [EventService],
})
export class EventModules {}
