/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerAdapter } from '../../../core/services/common/mailer.adapter';
import { SendEmailDTOCore } from '../../../core/dtos/email.dto';
import { EnvConfigService } from '../../../configurations/environment/env-config.service';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';

@Injectable()
export class NodemailerAdapter implements MailerAdapter {
  constructor(private readonly _config: EnvConfigService) {}

  async sendMail(data: SendEmailDTOCore): Promise<boolean> {
    const transporter = nodemailer.createTransport(this._config.MailConfig);

    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.handlebars',
          defaultLayout: false,
        },
        viewPath: './src/common/mailer/templates',
      }),
    );

    try {
      await transporter.sendMail(data);
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong while sending email');
    }
  }
}
