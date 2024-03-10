/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionManagerCore } from '../../core/services/common/transaction-manager.core';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { isArray } from 'class-validator';

@Injectable()
export class TypeormTransactionManager<T> implements TransactionManagerCore<T> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async create(entity: T[] | T): Promise<T[] | T> {
    return this.safeSave(entity);
  }

  async delete(entity: T[] | T): Promise<T[] | T> {
    return this.safeOperation(entity, async (manager, entity) => {
      if (isArray(entity)) {
        await Promise.all(entity.map((e) => manager.remove(e)));
      } else {
        await manager.remove(entity);
      }
    });
  }

  async update(entity: T[] | T): Promise<T[] | T> {
    return this.safeSave(entity);
  }

  private async safeOperation(
    entity: T[] | T,
    operation: (manager: EntityManager, entity: T[] | T) => Promise<void>,
  ): Promise<T[] | T> {
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        await operation(manager, entity);
      });
      return entity;
    } catch (error) {
      console.log(error);
      this.handleDbError();
    }
  }

  private async safeSave(entity: T[] | T): Promise<T[] | T> {
    return this.safeOperation(entity, async (manager, entity) => {
      await manager.save(entity);
    });
  }

  private handleDbError(): void {
    throw new HttpException('Something went wrong while saving the data', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
