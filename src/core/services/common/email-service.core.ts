/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

export abstract class EmailServiceCore {
  abstract sendEmail(from: string, to: string, subject: string, html: string): Promise<boolean>;
}
