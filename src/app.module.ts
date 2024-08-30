import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

/** Local Imports **/
import { AuthModule } from './modules/auth';

import { validate } from './config/validation';
import { GeneralModule } from './modules/general/general.module';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { JobsModule } from './modules/jobs/jobs.module';
import { ApiKeyMiddleware } from './libs/security/apiKeyAuth/apiKey.middleware';
import { JobsController, WorkersController } from './modules/jobs/controllers';
import { DeviceDetectionMiddleware } from './libs/device/detection/device.detection.middleware';
import { CommunicationModule } from './modules/communication/communication.module';
import { AppVersionController, SystemController } from './modules/general/controllers';
import RolesGuard from './modules/auth/guards/roles.guard';
import { CustomerModule } from './modules/customers/customers.module';
import { AnnouncementController, ChatGroupController, MessageController } from './modules/communication/controllers';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { OtpModule } from './modules/otp/otp.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { RegionsModule } from './modules/regions/regions.module';
import { EarningsModule } from './modules/earnings/earnings.module';
import { FeatureToggleMiddleware } from './modules/auth/middlewares/featuretoggle.middleware';
import { JobWorkerModule } from './modules/jobworker/jobworker.module';

@Module({
  imports: [
    /** Common Modules **/
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
        throwOnMissingKey: false,
      }),
      resolvers: [new QueryResolver(['lang']), new HeaderResolver(['X-Language']), AcceptLanguageResolver],
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),

    ThrottlerModule.forRootAsync({
      useFactory: () => [
        {
          ttl: Number(process.env.APP_THROTTLE_RESET_MILLISECONDS) || 60000,
          limit: Number(process.env.APP_THROTTLE_REQUEST_COUNT) || 100,
        },
      ],
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        legacySpatialSupport: false,
      }),
    }),

    /** App Modules **/

    AuthModule,
    GeneralModule,
    JobsModule,
    CommunicationModule,
    CustomerModule,
    OtpModule,
    InvoicesModule,
    RegionsModule,
    EarningsModule,
    JobWorkerModule,
  ],
  providers: [RolesGuard(), { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeviceDetectionMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(ApiKeyMiddleware).forRoutes(JobsController, WorkersController, MessageController, SystemController);
    consumer.apply(FeatureToggleMiddleware).forRoutes(ChatGroupController, AnnouncementController);

    consumer
      .apply(ApiKeyMiddleware)
      .exclude({ path: 'v1/versions/check', method: RequestMethod.GET })
      .forRoutes(AppVersionController);
  }
}
