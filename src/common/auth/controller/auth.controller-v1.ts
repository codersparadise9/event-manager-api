/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthServiceCore } from '../../../core/services/common/auth-service.core';
import { LocalAuthLoginDTO, LocalAuthSignupDTO } from '../../../core/dtos/auth-dto';
import { Response } from 'express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Auth_Types } from '../../../constants/auth';
import { generateFakeEvent } from '../../../_faker/event.faker';

@Controller('auth')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthServiceCore) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDTO: LocalAuthLoginDTO, @Res() response: Response) {
    console.log(generateFakeEvent());
    const tokens = await this.authService.login(loginDTO);
    response.set('Authorization', tokens.accessToken).set('x-refresh-token', tokens.refreshToken).send();
  }

  @Post('/signup')
  async signup(@Body() signUpDTO: LocalAuthSignupDTO, @Res() response: Response) {
    const tokens = await this.authService.signup(Auth_Types.LOCAL, signUpDTO);
    response.set('Authorization', tokens.accessToken).set('x-refresh-token', tokens.refreshToken).send();
  }

  /**
   * Currently the refresh token part has some bugs , working on fixing it
   */

  // @Get('/refresh')
  // async refreshToken(@Req() request: Request) {
  //   const token = request.headers['x-refresh-token'];
  //   console.log('Token = ', token);
  //   if (token) {
  //     const tokens = await this.authService.refreshToken(token);
  //     response.set('Authorization', tokens.accessToken).set('x-refresh-token', tokens.refreshToken).send();
  //   } else {
  //     throw new BadRequestException('token not found');
  //   }
  // }
}
