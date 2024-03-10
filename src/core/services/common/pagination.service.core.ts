/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { PaginatedResponse } from '../../dtos/paginated-response-dto';

export abstract class PaginationServiceCore<T> {
  abstract paginate(repository: any, query: any, page: number, limit: number): Promise<PaginatedResponse<T>>;
}
