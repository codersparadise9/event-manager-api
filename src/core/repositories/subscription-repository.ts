/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { GenericRepositoryCore } from './generic-repository.core';

export abstract class SubscriptionRepository<T> extends GenericRepositoryCore<T> {
  abstract findBy(filter: any): Promise<T[]>;
}
