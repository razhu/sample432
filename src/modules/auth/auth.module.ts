import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';

/** Libs Imports **/
import { JwtModule } from '../../libs/security/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

/** Cross-Module Imports **/
import entities from '../database/entities/mysql';

/** Local Imports **/
import { AuthController, UserController } from './controllers';
import { AuthService, UserService } from './services';
import { JwtAuthGuardName } from './constants';
import { JwtAuthStrategy, LocalAuthStrategy } from './strategies';
import { GeneralModule } from '../general/general.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    JwtModule,
    PassportModule.register({ defaultStrategy: [JwtAuthGuardName] }),
    GeneralModule,
  ],
  providers: [AuthService, JwtAuthStrategy, LocalAuthStrategy, UserService],
  controllers: [AuthController, UserController],
  exports: [PassportModule, AuthService, UserService],
})
export class AuthModule {}
