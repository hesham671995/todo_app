import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';
import { Constants } from 'src/utils/constants';
import { EmailService } from 'src/email/email.service';

// FIND ALL USERS
// ADD USER
// DELETE USER
// SEARCH USER BY EMAIL

@Injectable()
export class UserService {

  constructor(

    // Inject User Repository With Custom Methods
    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    // Inject Email Service
    private readonly emailService : EmailService,

  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = await new User();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;

    await this.userRepository.save(user);

    // send welcome email to user
    await this.emailService.sendUserWelcomeEmail(user);

    delete user.password;
    return user;
  } // create new user

  async findAll() {
    return await this.userRepository.find();
  } // get all users

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.getUserByEmail(email);
  } // find user by email

  /* update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  } */

  // Start Remove User Endpoint

  async removeUser(id: number): Promise<any> {
    let user: User = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
    } // throw exception if user not found

    return await this.userRepository.delete(id);

  } // delete user

  // End Remove User Endpoint

}
