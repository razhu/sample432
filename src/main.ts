import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, VersioningType } from '@nestjs/common';

import AppModule from './app.module';
import { GravyLogger } from './modules/general/services';
import { MessagingService } from './modules/communication/services/messaging.service';
import { ErrorInterceptor } from './modules/general/interceptors/error.interceptor';
import { I18nMiddleware, I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new GravyLogger(),
  });
  app.use(bodyParser.json({ limit: '1mb' }));

  // I18n
  app.use(I18nMiddleware);
  app.useGlobalPipes(new I18nValidationPipe({ transform: true, whitelist: true, validateCustomDecorators: true }));
  app.useGlobalFilters(new I18nValidationExceptionFilter());

  // Interceptors
  app.useGlobalInterceptors(new ErrorInterceptor());

  // Config declarations
  const configService = app.get(ConfigService);

  // Api configuration
  app.setGlobalPrefix('');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors({ origin: '*' });

  //TODO: Content Security Policy - Need to make this strict
  app.use(helmet({ crossOriginResourcePolicy: false , contentSecurityPolicy: {reportOnly: true} }));

  if (configService.get('APP_ENV') !== 'prod') {
    // Swagger configuration
    const documentBuilder = new DocumentBuilder()
    .setTitle(`GravyWork V3 Services - ${configService.get('APP_ENV')}`)
    .setDescription('')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('/', app, document);
  }

  new MessagingService();

  await app.listen(configService.get('APP_PORT'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
