import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("User")

export class UserController {
  
  constructor(private readonly userService: UserService) { }

  @Post("create")
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  } // create new user

  @Get()
  async findAll() {
    return await this.userService.findAll();
  } // get all users

  /* @Get(':id')
   findOne(@Param('id') id: string) {
     return this.userService.findOne(+id);
   } */

  @Get("searchEmail/:email")
  async findUserByEmail(@Param('email') email: string) {
    return await this.userService.findUserByEmail(email);
  } // find user by email

  /* @Patch(':id')
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
     return this.userService.update(+id, updateUserDto);
   } */

  // Start Remove User Endpoint

  @Delete('deleteUser/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return await this.userService.removeUser(+id);
  } // delete user

  // End Remove User Endpoint

}
