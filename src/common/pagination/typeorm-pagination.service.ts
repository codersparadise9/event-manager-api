/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { PaginationServiceCore } from '../../core/services/common/pagination.service.core';
import { PaginatedResponse } from '../../core/dtos/paginated-response-dto';
import { FindManyOptions, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormPaginationService<T> extends PaginationServiceCore<T> {
  async paginate(
    repository: Repository<T>,
    query: FindManyOptions<T>,
    page: number,
    limit: number,
  ): Promise<PaginatedResponse<T>> {
    const [result, total] = await repository.findAndCount(query);
    return {
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
