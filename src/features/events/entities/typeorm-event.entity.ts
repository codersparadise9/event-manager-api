/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../../../core/entities/event-entity';
import { TypeormBaseEntity } from '../../../common/entities/typeorm-base.entity';
import { TypeormUserEntity } from '../../users/entities/typeorm-user.entity';
import { TypeormSubscriptionEntity } from '../../subscriptions/entities/typeorm-subscription.entity';
import { User } from '../../../core/entities/user-entity';
import { Subscription } from '../../../core/entities/subscription';

@Entity('event')
export class TypeormEventEntity extends TypeormBaseEntity implements Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => TypeormUserEntity)
  owner: User;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => TypeormSubscriptionEntity, (subscription) => subscription.event)
  subscription: Subscription[];
}
