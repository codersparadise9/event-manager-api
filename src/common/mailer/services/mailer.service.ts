/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { MailServiceCore } from '../../../core/services/common/mail.service';
import { MailerAdapter } from '../../../core/services/common/mailer.adapter';
import { SendEmailDTOCore } from '../../../core/dtos/email.dto';

@Injectable()
export class MailerService implements MailServiceCore {
  constructor(private readonly mailAdapter: MailerAdapter) {}

  async sendEmail(data: SendEmailDTOCore): Promise<boolean> {
    return await this.mailAdapter.sendMail(data);
  }
}
