/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Global, Module } from '@nestjs/common';
import { MailServiceCore } from '../../core/services/common/mail.service';
import { MailerService } from './services/mailer.service';
import { MailerAdapter } from '../../core/services/common/mailer.adapter';
import { NodemailerAdapter } from './adapters/nodemailer.adapter';

@Global()
@Module({
  providers: [
    {
      provide: MailServiceCore,
      useClass: MailerService,
    },
    {
      provide: MailerAdapter,
      useClass: NodemailerAdapter,
    },
  ],
  exports: [MailServiceCore],
})
export class MailerModule {}
