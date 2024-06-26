import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Todo } from './entities/todo.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todos')
@ApiTags("Todo")

export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  // Start Create Todo Endpoint
  @Post("create")
  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTodoDto: CreateTodoDto, @Request() request) {
    let userId = await request.user.userId; // get user id
    return this.todoService.create(createTodoDto, userId);
  }
  // End Create Todo Endpoint

  // Start Get All User Todos
  @Get('user_todos')
  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  async findAllUserTodos(@Request() request) {
    console.log(request.session);
    let userId = request.user.userId; // get user id
    return await this.todoService.findAllTodosByUser(userId);
  }
  // End Get All User Todos

  // Start Mark Todo As Completed

  @Patch('updateTodo/:id')
  @ApiSecurity("JWT-auth")
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
  @ApiSecurity("JWT-auth")
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

  // Start Get All Todos Endpoint

  @Get('getAll')
  async getAllTodos(): Promise<Todo[]> {
    return await this.todoService.getAllTodos();
  }

  // End Get All Todos Endpoint

  // Start Get All Completed Todos

  @Get('getAllCompletedTodos')
  async getAllCompletedTodos(): Promise<Todo[]> {
    return await this.todoService.getAllCompletedTodos();
  }

  // End Get All Completed Todos

  // Start Get All Completed Todos For Specific User

  @Get('getAllUserCompletedTodos')
  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  async getAllUserCompletedTodos(@Request() request): Promise<Todo[]> {
    let userId = Number(request.user.userId);
    return await this.todoService.getAllAuthenticatedUserCompletedTodos(userId);
  }

  // End Get All Completed Todos For Specific User

  // Start Get All Not Completed Todos For Specific User

  @Get('getAllUserNotCompletedTodos')
  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  async getAllUserNotCompletedTodos(@Request() request): Promise<Todo[]> {
    let userId = Number(request.user.userId);
    return await this.todoService.getAllAuthenticatedUserNotCompletedTodos(userId);
  }

  // End Get All Not Completed Todos For Specific User

  // Start Get All Not Completed Todos

  @Get('getAllNotCompletedTodos')
  async getAllNotCompletedTodos(): Promise<Todo[]> {
    return await this.todoService.getAllNotCompletedTodos();
  }

  // End Get All Not Completed Todos

  // Start Get Specific Todo Endpoint

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.todoService.findOne(+id);
  }

  // End Get Specific Todo Endpoint

  // Start Remove Todo Endpoint

  @Delete(':id')
  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() request) {
    let userId = request.user.userId; // get user id 
    let deletedTodo = await this.todoService.remove(+id, userId);
    if (deletedTodo.affected) {
      return {
        "message": "Todo Deleted Successfully",
      }
    }
  }

  // End Remove Todo Endpoint

}
