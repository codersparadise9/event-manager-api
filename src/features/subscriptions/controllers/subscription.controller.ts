/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { AccessTokenGuard } from '../../../common/auth/guards/access-token.guard';
import { Subscription } from '../../../core/entities/subscription';
import { GetUser } from '../../../common/auth/decorators/auth-decorator';
import { JWTUser } from '../../../core/dtos/auth-dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly service: SubscriptionService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getSubscription(@GetUser() user: JWTUser): Promise<Subscription | Subscription[]> {
    return await this.service.findByFilter({}, user);
  }
}
