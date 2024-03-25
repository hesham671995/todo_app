import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';
import { Constants } from 'src/utils/constants';

// FIND ALL USERS
// ADD USER
// DELETE USER
// SEARCH USER BY EMAIL

@Injectable()
export class UserService {

  constructor(

    // Inject User Repository With Custom Methods
    @InjectRepository(User) 
    private readonly userRepository : UserRepository,

  ) {}

  async create(createUserDto: CreateUserDto) : Promise<User> {
    let user : User = await new User();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;

    await this.userRepository.save(user);
    delete user.password;
    return user;
  } // create new user

  async findAll() {
    return await this.userRepository.find();
  } // get all users

 async findOne(id: number) {
    return await this.userRepository.findOne({
      where : {
        id : id 
      }
    });
  } 

  async findUserByEmail(email : string) : Promise<User> {
     return await this.userRepository.getUserByEmail(email);
  } // find user by email

  /* update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  } */

  async remove(id: number) {
    return await this.userRepository.delete(id);
  } // delete user
}
