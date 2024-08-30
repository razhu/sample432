import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  PreconditionFailedException,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

/** Libs Imports **/
import { JwtModel } from '../../../libs/security/jwt';

/** Cross-Module Imports **/

/** Local Imports **/
import { LocalAuthGuard } from '../guards';
import { GravyRequest } from '../../general/types';
import { AuthService } from '../services/auth.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({ type: JwtModel })
  async signIn(@Req() request: GravyRequest, @I18n() i18n: I18nContext) {
    const { user } = request;

    if (!user.active) {
      throw new PreconditionFailedException(i18n.t('auth.AUTH_ACCOUNT_DISABLED'));
    }

    return this.authService.signIn(user);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh authentication token' })
  @ApiOkResponse({ type: JwtModel })
  refreshToken(@Query('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }
}
