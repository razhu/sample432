import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

/** Libs Imports **/
import { JwtPayloadModel } from '../../../libs/security/jwt';

/** Cross-Module Imports **/
import { UserService } from '../services';
import { User } from '../../database/entities/mysql';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly accountService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadModel): Promise<User> {
    const user = await this.accountService.findUserInDevices(payload.actor.id, payload.actor.type);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
