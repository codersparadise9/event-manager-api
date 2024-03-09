/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { AuthResponseDTO, JWTUser } from '../dtos/auth-dto';

export abstract class JwtService {
  abstract signToken(payload: JWTUser, key: string): Promise<AuthResponseDTO>;

  abstract refreshAccessToken(refreshToken: string): Promise<AuthResponseDTO>;

  abstract validateToken(token: string, key: string): Promise<JWTUser>;
}
