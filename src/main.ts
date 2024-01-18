import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import * as basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import config from './core/config/config';

async function bootstrap() {
  const CONFIG = config();

  const SWAGGER_ENVS = ['production', 'staging'];

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // THIS WHITELIST (gets rid) ANY DATA NOT SPECIFIED IN THE DTO
      forbidNonWhitelisted: true,
      //IF YOU WANT TO TRANSFORM YOUR RESPONSE, THEN ADD THIS
      //THEN INSIDE YOUR APP MODULE, PROVIDERS ADD THE CODE YOU SEE
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  if (SWAGGER_ENVS.includes(CONFIG.APP_ENV)) {
    app.use(
      ['/api'],
      basicAuth({
        challenge: true,
        users: {
          [CONFIG.SWAGGER_USER]: CONFIG.SWAGGER_PASSWORD,
        },
      }),
    );
  }

  const configuration = new DocumentBuilder()
    .setTitle('E-COMMERCE API')
    .setDescription('E-COMMERCE API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('E-COMMERCE')
    .setExternalDoc('Postman Collection', '/api-json')
    .build();

  const document = SwaggerModule.createDocument(app, configuration);
  SwaggerModule.setup('/api/docs', app, document);

  app.use(compression());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 1000,
      max: 6000 /*10000*/, // limit each IP to 100 requests per windowMs
    }),
  );

  await app.listen(CONFIG.APP_PORT, () => {
    console.log(`server started listening on port ${CONFIG.APP_PORT}`);
  });
}
bootstrap();
