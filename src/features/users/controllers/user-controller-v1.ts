/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from '../../../core/services/user.service';
import { CreateUserDTO, CreateUserResponseDTO } from '../dtos/user.dto';
import { Auth_Types } from '../../../constants/auth';
import { PaginatedResponse } from '../../../core/dtos/paginated-response-dto';
import { User } from '../../../core/entities/user-entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserControllerV1 {
  constructor(private readonly _userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<CreateUserResponseDTO | CreateUserResponseDTO[]> {
    return await this._userService.createUser(Auth_Types.LOCAL, createUserDTO);
  }

  @Get()
  async getAllUsers(@Query('page') page: number, @Query('limit') limit: number): Promise<PaginatedResponse<User>> {
    return await this._userService.find(page, limit);
  }
}
