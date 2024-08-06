import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import morgan from 'morgan';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const globalPrefix = '/api/v1';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Tictag Test API')
    .setDescription('Test for Tictag.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const apiHost = configService.get<string>('api.host');
  const apiPort = configService.get<number>('api.port');

  app.enableCors();
  app.use(helmet());
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => Logger.log(message.replace('\n', '')),
      },
    })
  );

  await app.listen(apiPort, apiHost);

  Logger.log(`🚀 API is running on: http://${apiHost}:${apiPort}`);
}

bootstrap();
