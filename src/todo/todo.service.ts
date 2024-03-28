import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repo/todo.repository';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repo/user.repository';

// ADD TODO BASED ON USER ID 
// FIND ALL TODOS BASED ON USER ID 
// MARK TODO AS COMPLETED BASED ON TODO ID

@Injectable()
export class TodoService {

  constructor(

    // Inject Todo Repository With Custom Methods
    @InjectRepository(Todo)
    private readonly todoRepository: TodoRepository,

    private readonly userService: UserService,

    // Inject User Repository With Custom Methods
    @InjectRepository(User)
    private readonly userRepository: UserRepository,

  ) { }

  // Start Create Todo Endpoint
  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {

    // get todo creator
    let user = await this.userService.findOne(userId);

    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = user;

    // remove password field from response
    delete user.password;

    return this.todoRepository.save(todo); // create todo

  }
  // End Create Todo Endpoint

  // Start Get All User Todos

  async findAllTodosByUser(userId: number) {
    return await this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId } }
    });
  }

  // End Get All User Todos

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  // Start Mark Todo As Completed

  async markTodoCompleted(todoId: number, userId: number): Promise<any> {
    let todo = await this.todoRepository.findOne({
      where: { id: todoId },
      relations: ['user']
    });
    if (!todo) {
      throw new HttpException('Todo Not Found', HttpStatus.NOT_FOUND);
    } // Check If Todo Exists
    if (todo.user.id != userId) {
      throw new ForbiddenException('You dont have access to update this todo');
    }
    await this.todoRepository.update(todoId, { completed: true });
    let updatedTodo = this.todoRepository.findOne({ relations: ['user'], where: { id: todoId } });
    delete (await updatedTodo).user.password;
    return updatedTodo;
  }

  // End Mark Todo As Completed

  // Start Update Specific Todo

  async updateTodo(todoId: number, userId: number, updateTodoDto: UpdateTodoDto): Promise<any> {
    let todo = await this.todoRepository.findOne({
      where: { id: todoId },
      relations: ['user']
    });
    if (!todo) {
      throw new HttpException('Todo Not Found', HttpStatus.NOT_FOUND);
    } // Check If Todo Exists
    if (todo.user.id != userId) {
      throw new ForbiddenException('You dont have access to update this todo');
    }
    let updatedTodo: Todo = await new Todo();
    updatedTodo.title = updateTodoDto.title;
    updatedTodo.completed = updateTodoDto.completed;
    updatedTodo.id = todoId;

    await this.todoRepository.save(updatedTodo); // save updated todo

    let edittedTodo = this.todoRepository.findOne({ relations: ['user'], where: { id: todoId } });
    delete (await edittedTodo).user.password;
    return edittedTodo; // return updated todo

  }

  // End Update Specific Todo

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }

  // Start Get All Todos Endpoint

  async findAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.find({
      relations: ['user']
    });
  }

  // End Get All Todos Endpoint
}
