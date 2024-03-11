/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

export interface MailConfig {
  host?: string;
  port?: number;
  service?: string;
  auth: {
    user: string;
    pass: string;
  };
}
