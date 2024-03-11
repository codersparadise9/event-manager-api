/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from 'src/core/dtos/paginated-response-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormSubscriptionEntity } from '../entities/typeorm-subscription.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { isArray } from 'class-validator';
import { TransactionManagerCore } from '../../../core/services/common/transaction-manager.core';
import { EntityWithoutId } from '../../../core/types/entity-omit-id.type';
import { PaginationServiceCore } from '../../../core/services/common/pagination.service.core';
import { SubscriptionRepository } from '../../../core/repositories/subscription-repository';

@Injectable()
export class TypeormSubscriptionRepository implements SubscriptionRepository<TypeormSubscriptionEntity> {
  constructor(
    @InjectRepository(TypeormSubscriptionEntity) private readonly _repository: Repository<TypeormSubscriptionEntity>,
    private readonly _transactionManager: TransactionManagerCore<TypeormSubscriptionEntity>,
    private readonly _paginationService: PaginationServiceCore<TypeormSubscriptionEntity>,
  ) {}

  async findBy(filter: FindOptionsWhere<TypeormSubscriptionEntity>): Promise<TypeormSubscriptionEntity[]> {
    return await this._repository.findBy(filter);
  }

  async create(
    entity: EntityWithoutId<TypeormSubscriptionEntity> | EntityWithoutId<TypeormSubscriptionEntity>[],
  ): Promise<TypeormSubscriptionEntity[] | TypeormSubscriptionEntity> {
    let entityToBeSaved: TypeormSubscriptionEntity | TypeormSubscriptionEntity[];
    if (isArray(entity)) {
      entityToBeSaved = this._repository.create(entity);
    } else {
      entityToBeSaved = this._repository.create(entity);
    }
    return await this._transactionManager.create(entityToBeSaved);
  }

  async delete(id: any): Promise<TypeormSubscriptionEntity[] | TypeormSubscriptionEntity> {
    const subscription = isArray(id)
      ? await Promise.all(id.map(async (id) => await this._repository.findOne(id)))
      : await this._repository.findOne(id);
    return await this._transactionManager.delete(subscription);
  }

  async find(page: number, limit: number): Promise<PaginatedResponse<TypeormSubscriptionEntity>> {
    const options = {
      skip: (page - 1) * limit,
      take: limit,
    };
    return await this._paginationService.paginate(this._repository, options, page, limit);
  }

  async findByFilter(filter: Partial<TypeormSubscriptionEntity>, page: number, limit: number): Promise<PaginatedResponse<TypeormSubscriptionEntity>> {
    const options = {
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    };
    return this._paginationService.paginate(this._repository, options, page, limit);
  }

  async findByID(id: any): Promise<TypeormSubscriptionEntity> {
    return await this._repository.findOne(id);
  }

  async update(entity: TypeormSubscriptionEntity[] | TypeormSubscriptionEntity): Promise<TypeormSubscriptionEntity[] | TypeormSubscriptionEntity> {
    return await this._transactionManager.update(entity);
  }
}
