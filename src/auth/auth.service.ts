import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    // Start Login User Endpoint
    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
        };

        return {
            ...user,
            access_token: this.jwtService.sign(payload),
        };
    }
    // End Login User Endpoint

    // Start Function validateUser() to validate login user data 

    async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
        const { email, password } = authLoginDto;

        const user = await this.userService.findUserByEmail(email);
        if (!(await user?.validatePassword(password))) {
            throw new UnauthorizedException();
        }

        return user;
    }

    // End Function validateUser() to validate login user data 

}
