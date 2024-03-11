/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Module } from '@nestjs/common';
import { UserControllerV1 } from './controllers/user-controller-v1';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserEntity } from './entities/typeorm-user.entity';
import { UserService } from '../../core/services/user.service';
import { UserServiceV1 } from './services/user-service-v1';
import { UserRepository } from '../../core/repositories/user-repository';
import { IsEmailRegistered } from './dtos/validators/email-already-registered.validator';
import { TypeormUserRepository } from './repositories/typeorm-user.repository';
import { IsEmailNotRegistered } from './dtos/validators/email-registered.validator';

@Module({
  controllers: [UserControllerV1],
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
    IsEmailRegistered,
    IsEmailNotRegistered,
  ],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
