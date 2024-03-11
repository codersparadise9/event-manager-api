/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../../../../core/services/user.service';

@ValidatorConstraint({ async: true })
export class EmailRegisteredValidator implements ValidatorConstraintInterface {
  constructor(private readonly _userService: UserService) {}

  async validate(email: any) {
    const user = await this._userService.findByEmail(email);
    return !user;
  }
}

export function IsEmailRegistered(validationOptions?: ValidationOptions) {
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
