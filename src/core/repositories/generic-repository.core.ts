/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { PaginatedResponse } from '../dtos/paginated-response-dto';

export abstract class GenericRepositoryCore<T> {
  abstract findByID(id: any): Promise<T>;

  abstract findByFilter(filter: Partial<T>): Promise<PaginatedResponse<T> | PaginatedResponse<T>[]>;

  abstract find(): Promise<PaginatedResponse<T>[]>;

  abstract create(entity: Omit<T, keyof T>): Promise<T>;

  abstract create(entities: Omit<T, keyof T>[]): Promise<T[]>;

  abstract update(entity: T): Promise<T>;

  abstract delete(id: any): Promise<T>;

  abstract delete(id: any[]): Promise<T[]>;
}
