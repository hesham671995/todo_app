import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CustomUserRepository } from './repo/user.repository';
import { DataSource } from 'typeorm';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]) , EmailModule],
  controllers: [UserController],
  providers: [
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(User).extend(CustomUserRepository);
      },
    },
    UserService
  ],
  exports : [UserService],
})
export class UserModule {}
