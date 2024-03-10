/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { UserService } from '../../../core/services/user.service';
import { CreateUserDTO, CreateUserResponseDTO } from '../dtos/user.dto';
import { UserRepository } from '../../../core/repositories/user-repository';
import { Auth_Types } from '../../../constants/auth';
import { UserDTOMapper } from '../dtos/mappers/dto-mapper';
import { PaginatedResponse } from '../../../core/dtos/paginated-response-dto';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';

@Injectable()
export class UserServiceV1 implements UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async createUser(authType: Auth_Types, createUserDTO: CreateUserDTO): Promise<CreateUserResponseDTO | CreateUserResponseDTO[]> {
    return await this._userRepository.create(UserDTOMapper.mapCreateDTO(createUserDTO, authType));
  }

  async findByEmail(email: string): Promise<TypeormUserEntity> {
    return await this._userRepository.findByEmail(email);
  }

  async find(page: number, limit: number): Promise<PaginatedResponse<TypeormUserEntity>> {
    return this._userRepository.find(page, limit);
  }

  async findByEmailAndPassword(email: string, password: string): Promise<TypeormUserEntity> {
    return this._userRepository.findByEmailAndPassword(email, password);
  }
}
