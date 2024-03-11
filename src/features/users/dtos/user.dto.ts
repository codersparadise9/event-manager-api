/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { CreateUserDtoCore, CreateUserResponseDTOCore } from '../../../core/dtos/user-dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Auth_Types } from '../../../constants/auth';

export class CreateUserDTO implements CreateUserDtoCore {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @IsString()
  @IsNotEmpty()
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
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
