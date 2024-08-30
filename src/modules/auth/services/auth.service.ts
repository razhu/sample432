import { Injectable, UnauthorizedException } from '@nestjs/common';

/** Libs Imports **/
import { EncryptionService } from '../../../libs/security/encryption';
import { JwtModel, JwtService, JwtType } from '../../../libs/security/jwt';

/** Cross-Module Imports **/
import { UserService } from '../services';
import { User } from '../../database/entities/mysql';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  signIn(user: User) {
    return this.jwtService.generateJwt({
      actor: {
        id: user.id,
        type: JwtType.TenantAdmin,
        parent_id: '1',
      },
    });
  }

  async verifyToken(token: string): Promise<User> {
    const tokenPayload = this.jwtService.verifyToken(token);

    if (!tokenPayload || tokenPayload == null) {
      throw new UnauthorizedException();
    }
    return this.userService.findUserInDevices(tokenPayload.actor.id, tokenPayload.actor.type);
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.findOneByEmail(email.toLowerCase());

      if (!(await EncryptionService.validatePassword(plainTextPassword, user.passwordDigest))) {
        throw new UnauthorizedException();
      }

      user.passwordDigest = undefined;
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  refreshToken(token: string, shouldIgnoreExpiration = false): JwtModel {
    return this.jwtService.refreshToken(token, shouldIgnoreExpiration);
  }
}
