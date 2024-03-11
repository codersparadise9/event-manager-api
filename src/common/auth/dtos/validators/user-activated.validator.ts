/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../../../../core/services/user.service';
import { EmailRegisteredValidator } from './email-registered.validator';

@ValidatorConstraint({ async: true })
export class UserVerifiedValidator implements ValidatorConstraintInterface {
  constructor(private readonly _userService: UserService) {}

  async validate(email: any) {
    const user = await this._userService.findByEmail(email);
    return user.verified;
  }
}

export function IsUserVerified(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailRegisteredValidator,
    });
  };
}
