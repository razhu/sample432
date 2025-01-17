import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_HOST') as string,
        dbName: configService.get<string>('MONGO_DB_NAME') as string,
        tlsCAFile: configService.get<string>('APP_ENV') === 'local' ? null : `./global-bundle.pem`,
      }),
    }),
  ],
})
export class MongoDatabaseModule {}
