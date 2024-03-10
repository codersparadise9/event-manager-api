/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from 'src/core/dtos/paginated-response-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import { Repository } from 'typeorm';
import { isArray } from 'class-validator';
import { TransactionManagerCore } from '../../../core/services/common/transaction-manager.core';
import { UserRepository } from '../../../core/repositories/user-repository';
import { EntityWithoutId } from '../../../core/types/entity-omit-id.type';
import { PaginationServiceCore } from '../../../core/services/common/pagination.service.core';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeormUserEntity) private readonly _repository: Repository<TypeormUserEntity>,
    private readonly _transactionManager: TransactionManagerCore<TypeormUserEntity>,
    private readonly _paginationService: PaginationServiceCore<TypeormUserEntity>,
  ) {}

  async findByEmailAndPassword(email: string, password: string): Promise<TypeormUserEntity> {
    return await this._repository.findOne({
      where: {
        email,
        password,
      },
    });
  }

  async findByEmail(email: string): Promise<TypeormUserEntity> {
    return await this._repository.findOne({ where: { email } });
  }

  async create(
    entity: EntityWithoutId<TypeormUserEntity> | EntityWithoutId<TypeormUserEntity>[],
  ): Promise<TypeormUserEntity[] | TypeormUserEntity> {
    let entityToBeSaved: TypeormUserEntity | TypeormUserEntity[];
    if (isArray(entity)) {
      entityToBeSaved = this._repository.create(entity);
    } else {
      entityToBeSaved = this._repository.create(entity);
    }
    return await this._transactionManager.create(entityToBeSaved);
  }

  async delete(id: any): Promise<TypeormUserEntity[] | TypeormUserEntity> {
    const user = isArray(id)
      ? await Promise.all(id.map(async (id) => await this._repository.findOne(id)))
      : await this._repository.findOne(id);
    return await this._transactionManager.delete(user);
  }

  async find(page: number, limit: number): Promise<PaginatedResponse<TypeormUserEntity>> {
    const options = {
      skip: (page - 1) * limit,
      take: limit,
    };
    return await this._paginationService.paginate(this._repository, options, page, limit);
  }

  async findByFilter(
    filter: Partial<TypeormUserEntity>,
    page: number,
    limit: number,
  ): Promise<PaginatedResponse<TypeormUserEntity>> {
    const options = {
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    };
    return this._paginationService.paginate(this._repository, options, page, limit);
  }

  async findByID(id: any): Promise<TypeormUserEntity> {
    return await this._repository.findOne(id);
  }

  async update(entity: TypeormUserEntity[] | TypeormUserEntity): Promise<TypeormUserEntity[] | TypeormUserEntity> {
    return await this._transactionManager.update(entity);
  }
}
