// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { GravyRequest } from '../../general/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: GravyRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = await this.authService.verifyToken(token);

        // Attach the user to the request for downstream use
        req.user = user;
      } catch (error) {
        // Token is expired or invalid, initiate token refresh
        // Here we are ignoring the expiration check
        const refreshedToken = this.authService.refreshToken(token, true);

        // Update the authorization header with the refreshed token
        // X-Refreshed-Token
        req.headers.authorization = `Bearer ${refreshedToken.accessToken}`;
        res.setHeader('X-Refreshed-Token', refreshedToken.accessToken);
      }
    }
    next();
  }
}
