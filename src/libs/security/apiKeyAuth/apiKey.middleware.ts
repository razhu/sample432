import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  private readonly validApiKey = this.configService.get('APP_API_KEY');

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || !this.validApiKey || apiKey !== this.validApiKey) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    return next();
  }
}
