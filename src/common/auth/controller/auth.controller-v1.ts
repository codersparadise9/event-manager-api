/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthServiceCore } from '../../../core/services/common/auth-service.core';
import { JWTUser } from '../../../core/dtos/auth-dto';
import { Response } from 'express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Auth_Types } from '../../../constants/auth';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { MailServiceCore } from '../../../core/services/common/mail.service';
import { GetUser } from '../decorators/auth-decorator';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { LoginDTO, SignUpUserDTO } from '../dtos/auth.dtos';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthControllerV1 {
  constructor(
    private readonly authService: AuthServiceCore,
    private readonly mailer: MailServiceCore,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDTO: LoginDTO, @Res() response: Response) {
    const tokens = await this.authService.login(loginDTO);
    response.set('Authorization', tokens.accessToken).set('x-refresh-token', tokens.refreshToken).send();
  }

  @Post('/signup')
  async signup(@Body() signUpDTO: SignUpUserDTO, @Res() response: Response) {
    const tokens = await this.authService.signup(Auth_Types.LOCAL, signUpDTO);
    await this.mailer.sendEmail({
      from: 'codersparadise9@gmail.com',
      to: 'anup.tiwari787@gmail.com',
      template: 'welcome',
      context: { name: 'anup tiwari' },
      subject: 'welcome',
    });
    response.set('Authorization', tokens.accessToken).set('x-refresh-token', tokens.refreshToken).send();
  }

  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@GetUser() jwtUser: JWTUser, @Res() response: Response) {
    const tokens = await this.authService.refreshToken(jwtUser);
    response.set('Authorization', tokens.accessToken).set('x-refresh-token', tokens.refreshToken).send();
  }

  @Get('/logout')
  @UseGuards(AccessTokenGuard)
  async logout(@Res() response: Response) {
    response.set('Authorization', '').set('x-refresh-token', '').send();
  }
}
