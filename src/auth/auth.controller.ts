import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  // Start Login User Endpoint
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) : Promise<any> {
    return {
      "data" : await this.authService.login(authLoginDto),
    }
  }
  // End Login User Endpoint

  /* @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() request) : Promise<any> {
      console.log(request.headers.authorization.slice(7));
      return {
        "message" : "user logged out successfully"
      }
  } */

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test(@Request() request) {
   // console.log(request.user.userId );
    return await "success";
  } // just for test 

}
