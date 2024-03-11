/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserEntity } from './entities/typeorm-user.entity';
import { UserService } from '../../core/services/user.service';
import { UserServiceV1 } from './services/user-service-v1';
import { UserRepository } from '../../core/repositories/user-repository';

import { TypeormUserRepository } from './repositories/typeorm-user.repository';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([TypeormUserEntity])],
  providers: [
    {
      provide: UserService,
      useClass: UserServiceV1,
    },
    {
      provide: UserRepository,
      useClass: TypeormUserRepository,
    },
  ],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
