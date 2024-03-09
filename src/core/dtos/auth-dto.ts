/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

export interface AuthResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LocalAuthLoginDTO {
  email: string;
  password: string;
}

export interface LocalAuthSignupDTO {
  email: string;
  password: string;
  fullName: string;
}

export interface JWTUser {
  id: string;
  email: string;
  fullName: string;
}
