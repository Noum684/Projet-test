import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // === CORS ===
  app.enableCors({
    origin: 'http://localhost:4200', // Angular dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  });

  // === Validation globale ===
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // === Swagger ===
  const config = new DocumentBuilder()
    .setTitle('Multi-tenant Project Manager - API')
    .setDescription('API pour test technique multi-tenant')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  // === Démarrage du serveur ===
  await app.listen(process.env.PORT ?? 3000);
  console.log('Listening on', await app.getUrl());
}

bootstrap();
