/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { CreateUserDtoCore, CreateUserResponseDTOCore } from '../../../core/dtos/user-dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Auth_Types } from '../../../constants/auth';
import { EmailNotRegistered } from './validators/email-registered.validator';
import { EmailRegistered } from './validators/email-already-registered.validator';

export class CreateUserDTO implements CreateUserDtoCore {
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
  @MinLength(6)
  password: string;
}

export class CreateUserResponseDTO implements CreateUserResponseDTOCore {
  id: string;
  authType: Auth_Types;
  email: string;
  fullName: string;
}

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @EmailNotRegistered({ message: 'user not registered' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
