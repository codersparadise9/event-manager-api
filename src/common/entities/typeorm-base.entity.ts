/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class TypeormBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
