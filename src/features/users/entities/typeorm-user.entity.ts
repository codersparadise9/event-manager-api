/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { User } from '../../../core/entities/user-entity';
import { Auth_Types } from '../../../constants/auth';
import { Column, Entity, OneToMany } from 'typeorm';
import { TypeormBaseEntity } from '../../../common/entities/typeorm-base.entity';
import { Exclude } from 'class-transformer';
import { TypeormSubscriptionEntity } from '../../subscriptions/entities/typeorm-subscription.entity';

@Entity('user')
export class TypeormUserEntity extends TypeormBaseEntity implements User {
  @Column({ type: 'enum', enum: Auth_Types, default: Auth_Types.LOCAL })
  authType: Auth_Types;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => TypeormSubscriptionEntity, (subscription) => subscription.user)
  subscription: TypeormSubscriptionEntity[];
}
