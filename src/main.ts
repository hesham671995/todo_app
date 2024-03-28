import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from "express-session"
import * as passport from "passport"
import { CronJobService } from './cron.job';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cronJobService = app.get(CronJobService);
  cronJobService.runEveryTwoMinutes(); // Start the cron job manually
  app.useGlobalPipes( new ValidationPipe() );
  await app.listen(5000);
}
bootstrap();
