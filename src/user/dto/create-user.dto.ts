import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    firstName : string;

    @ApiProperty()
    @IsString()
    lastName : string;

    @ApiProperty()
    @IsEmail()
    email : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password : string;

}
