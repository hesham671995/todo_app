import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './cron.job';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.local.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal : true
      })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get("DATABASE_USERNAME"),
        password: configService.get("DATABASE_PASSWORD"),
        synchronize: configService.get<boolean>("DATABASE_SYNC"),
        logging: configService.get<boolean>("DATABASE_LOGGING"),
        database: configService.get("DATABASE_NAME"),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      })
    }),
    UserModule,
    TodoModule,
    AuthModule,
    ScheduleModule.forRoot(),
    EmailModule
  ],
  controllers: [],
  providers: [CronJobService],
})
export class AppModule { }
