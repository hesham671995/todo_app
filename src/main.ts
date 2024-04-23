import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from "express-session"
import * as passport from "passport"
import { CronJobService } from './cron.job';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cronJobService = app.get(CronJobService);
  cronJobService.runEveryTwoMinutes(); // Start the cron job manually
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle("Todo List Application")
    .setDescription("Todo List Application With API Documentation")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT Token",
      in: "header"
    }, "JWT-auth").build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);


  await app.listen(5000);
}
bootstrap();
