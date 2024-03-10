/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../../core/repositories/event-repository';
import { TypeormEventEntity } from '../entities/typeorm-event.entity';
import { PaginatedResponse } from '../../../core/dtos/paginated-response-dto';
import { EntityWithoutId } from '../../../core/types/entity-omit-id.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionManagerCore } from '../../../core/services/common/transaction-manager.core';
import { PaginationServiceCore } from '../../../core/services/common/pagination.service.core';
import { isArray } from 'class-validator';

@Injectable()
export class TypeormEventRepository implements EventRepository<TypeormEventEntity> {
  constructor(
    @InjectRepository(EventRepository) private readonly _repository: Repository<TypeormEventEntity>,
    private readonly _transactionManager: TransactionManagerCore<TypeormEventEntity>,
    private readonly _paginationService: PaginationServiceCore<TypeormEventEntity>,
  ) {}

  async create(
    entity: EntityWithoutId<TypeormEventEntity> | EntityWithoutId<TypeormEventEntity>[],
  ): Promise<TypeormEventEntity[] | TypeormEventEntity> {
    let entityToBeSaved: TypeormEventEntity | TypeormEventEntity[];
    if (isArray(entity)) {
      entityToBeSaved = this._repository.create(entity);
    } else {
      entityToBeSaved = this._repository.create(entity);
    }
    return await this._transactionManager.create(entityToBeSaved);
  }

  async delete(id: any): Promise<TypeormEventEntity[] | TypeormEventEntity> {
    const event = isArray(id)
      ? await Promise.all(id.map(async (id) => await this._repository.findOne(id)))
      : await this._repository.findOne(id);
    return await this._transactionManager.delete(event);
  }

  async find(page: number, limit: number): Promise<PaginatedResponse<TypeormEventEntity>> {
    const options = {
      skip: (page - 1) * limit,
      take: limit,
    };
    return await this._paginationService.paginate(this._repository, options, page, limit);
  }

  async findByFilter(
    filter: Partial<TypeormEventEntity>,
    page: number,
    limit: number,
  ): Promise<PaginatedResponse<TypeormEventEntity>> {
    const options = {
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    };
    return this._paginationService.paginate(this._repository, options, page, limit);
  }

  async findByID(id: any): Promise<TypeormEventEntity> {
    return await this._repository.findOne(id);
  }

  async update(entity: TypeormEventEntity[] | TypeormEventEntity): Promise<TypeormEventEntity | TypeormEventEntity[]> {
    return await this._transactionManager.update(entity);
  }

  async findBy(filter: FindOptionsWhere<TypeormEventEntity>): Promise<TypeormEventEntity[]> {
    return await this._repository.findBy(filter);
  }
}
