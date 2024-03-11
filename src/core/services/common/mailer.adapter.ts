/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { SendEmailDTOCore } from '../../dtos/email.dto';

export abstract class MailerAdapter {
  abstract sendMail(data: SendEmailDTOCore): Promise<boolean>;
}
