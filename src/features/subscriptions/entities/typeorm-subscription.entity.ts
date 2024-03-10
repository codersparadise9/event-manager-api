/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeormBaseEntity } from '../../../common/entities/typeorm-base.entity';
import { Subscription } from '../../../core/entities/subscription';
import { TypeormUserEntity } from '../../users/entities/typeorm-user.entity';
import { TypeormEventEntity } from '../../events/entities/typeorm-event.entity';

@Entity('subscription')
export class TypeormSubscriptionEntity extends TypeormBaseEntity implements Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeormEventEntity, (event) => event.subscriptions)
  @JoinColumn({ name: 'event_id' })
  event: TypeormEventEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  subscriptionDate: Date;

  @ManyToOne(() => TypeormUserEntity, (user) => user.subscription)
  @JoinColumn({ name: 'user_id' })
  user: TypeormUserEntity;
}
