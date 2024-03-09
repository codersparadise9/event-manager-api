/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { AuthResponseDTO, LocalAuthLoginDTO, LocalAuthSignupDTO } from '../dtos/auth-dto';

export abstract class AuthServiceCore {
  abstract login(loginDTO?: LocalAuthLoginDTO): Promise<AuthResponseDTO>;

  abstract signup(signUpDTO?: LocalAuthSignupDTO): Promise<AuthResponseDTO>;

  abstract logout(accessToken?: string): Promise<null>;
}
