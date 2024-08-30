import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as DefaultJwtModule } from '@nestjs/jwt';

import { JwtService } from './jwt.service';

@Module({
  imports: [
    DefaultJwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN'),
            issuer: 'GRAVY',
            algorithm: 'HS256',
          },
        };
      },
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
