import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { DataSource } from 'typeorm';
import { CustomTodoRepository } from './repo/todo.repository';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports : [TypeOrmModule.forFeature([Todo,User])],
  controllers: [TodoController],
  providers: [
    {
      provide: getRepositoryToken(Todo),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(Todo).extend(CustomTodoRepository);
      },
    },
    TodoService,
    UserService
  ],
})
export class TodoModule {}
