/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

export abstract class TransactionManagerCore<T> {
  abstract create(entity: T | T[]): Promise<T | T[]>;

  abstract update(entity: T | T[]): Promise<T | T[]>;

  abstract delete(entity: T | T[]): Promise<T | T[]>;
}
