/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { PaginatedResponse } from '../dtos/paginated-response-dto';
import { EntityWithoutId } from '../types/entity-omit-id.type';

export abstract class GenericRepositoryCore<T> {
  abstract findByID(id: any): Promise<T>;

  abstract findByFilter(filter: Partial<T>, page: number, limit: number): Promise<PaginatedResponse<T>>;

  abstract find(page: number, limit: number): Promise<PaginatedResponse<T>>;

  abstract create(entity: EntityWithoutId<T> | EntityWithoutId<T>[]): Promise<T | T[]>;

  abstract update(entity: T | T[]): Promise<T | T[]>;

  abstract delete(id: any | any[]): Promise<T | T[]>;
}
