/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailNotRegistered } from './validators/email-registered.validator';
import { UserVerified } from './validators/user-activated.validator';
import { EmailRegistered } from './validators/email-already-registered.validator';
import { PasswordStrength } from './validators/password-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @EmailNotRegistered({ message: 'user not registered' })
  @UserVerified({ message: 'please verify email and sign in again' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @EmailRegistered({ message: 'email already registered' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @PasswordStrength()
  password: string;
}
