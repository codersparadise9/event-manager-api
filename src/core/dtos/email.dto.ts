/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

export interface SendEmailDTOCore {
  from: string;
  to: string;
  subject: string;
  template: string;
  context?: object;
}
