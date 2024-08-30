import { Module } from '@nestjs/common';
import { HealthController, AppVersionController, SystemController } from './controllers';
import { AppVersionService, GeneralService, S3Service } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../database/entities/mysql';
import { GravyBaseService } from './services/gravy.base.service';
import { RedisService } from './services/redis.service';
import { RedisClientFactory } from './redis/redis.client.factory';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [HealthController, AppVersionController, SystemController],
  providers: [AppVersionService, S3Service, GravyBaseService, GeneralService, RedisClientFactory, RedisService],
  exports: [AppVersionService, S3Service, GravyBaseService, GeneralService, RedisService],
})
export class GeneralModule {}
