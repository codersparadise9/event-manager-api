/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PasswordStrength } from './validators/password-validator';
import { IsEmailNotFound } from './validators/email-not-found.validator';
import { IsEmailRegistered } from './validators/email-registered.validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @IsEmailNotFound({ message: 'email not registered' })
  //@IsUserVerified({ message: 'please verify email and sign in again' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @IsEmailRegistered({ message: 'email already registered' })
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
