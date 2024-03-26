import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  // Start Create Todo Endpoint
  @Post("create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTodoDto: CreateTodoDto, @Request() request) {
    let userId = await request.user.userId; // get user id
    return this.todoService.create(createTodoDto, userId);
  }
  // End Create Todo Endpoint

  // Start Get All User Todos
  @Get('user_todos')
  @UseGuards(JwtAuthGuard)
  async findAllUserTodos(@Request() request) {
    console.log(request.session);
    let userId = request.user.userId; // get user id
    return await this.todoService.findAllTodosByUser(userId);
  }
  // End Get All User Todos

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  // Start Mark Todo As Completed

  @Patch('updateTodo/:id')
  @UseGuards(JwtAuthGuard)
  async markTodoAsCompleted(@Param('id') id: string, @Request() request): Promise<any> {
    let userId = request.user.userId; // get user id
    let updatedTodo = await this.todoService.markTodoCompleted(+id, userId);
    return {
      "message": "Todo Marked As Completed Successfully",
      "data": updatedTodo
    }
  }

  // End Mark Todo As Completed

  // Start Update Specific Todo

  @Patch('updateAllTodo/:id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(
    @Param('id') id: string,
    @Request() request,
    @Body() updateTodoDto: UpdateTodoDto): Promise<any> {
    let userId = request.user.userId; // get user id
    let updatedTodo = await this.todoService.updateTodo(+id, userId, updateTodoDto);
    return {
      "message": "Todo Updated Successfully",
      "data": updatedTodo
    }
  }

  // End Update Specific Todo 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }


  // Start Get All Todos Endpoint

  @Get("getAll")
  getAllTodos(): any {
    return "all todos";
    // return await this.todoService.findAllTodos();
  }

  // End Get All Todos Endpoint

  /* @Get("test")
   async test() : Promise<any> {
     return await "test function";
   } */
}
