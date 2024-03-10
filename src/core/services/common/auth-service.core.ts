/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { AuthResponseDTO, LocalAuthLoginDTO, LocalAuthSignupDTO } from '../../dtos/auth-dto';
import { Auth_Types } from '../../../constants/auth';

export abstract class AuthServiceCore {
  abstract login(loginDTO?: LocalAuthLoginDTO): Promise<AuthResponseDTO>;

  abstract signup(authType: Auth_Types, signUpDTO?: LocalAuthSignupDTO): Promise<AuthResponseDTO>;

  abstract logout(accessToken?: string): Promise<boolean>;

  abstract refreshToken(refreshToke: string): Promise<AuthResponseDTO>;
}
