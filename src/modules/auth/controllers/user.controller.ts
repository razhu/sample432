import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Get, Req, Controller, UseGuards, UseInterceptors, Patch, Body, Post } from '@nestjs/common';
import { UserService } from '../services';

/** Libs Imports **/
import { MongooseClassSerializer } from '../../../libs/database/mongo';

/** Cross-Module Imports **/
import { GravyRequest } from '../../general/types';
import { JwtAuthGuard } from '../guards';

/** Local Imports **/
import { User } from '../../database/entities/mysql';
import { AppAccessDTO } from '../dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(MongooseClassSerializer(User))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: 'Get own user' })
  @UseInterceptors(MongooseClassSerializer(User))
  async fetchCurrentUser(@Req() request: GravyRequest): Promise<User> {
    const { user } = request;

    return user;
  }

  @Post('/request-access/client-app')
  @ApiOperation({ summary: 'Request client app access' })
  async requestClientAppAccess(@Body() body: AppAccessDTO, @I18n() i18n: I18nContext): Promise<{ message: string }> {
    await this.userService.upsertRequest(body.email);
    return {
      message: i18n.t('auth.USER_ACCESS_REQUESTED'),
    };
  }

  @Patch('/grant-access/client-app')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Grant client app access (Admin Panel)' })
  async grantClientAppAccess(@Body() body: AppAccessDTO, @I18n() i18n: I18nContext): Promise<{ message: string }> {
    await this.userService.grantAccess(body.email);
    return {
      message: i18n.t('auth.USER_ACCESS_GRANTED'),
    };
  }

  @Patch('/revoke-access/client-app')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Revoke client app access (Admin Panel)' })
  async revokeClientAppAccess(@Body() body: AppAccessDTO, @I18n() i18n: I18nContext): Promise<{ message: string }> {
    await this.userService.revokeAccess(body.email);
    return {
      message: i18n.t('auth.USER_ACCESS_REVOKED'),
    };
  }
}
