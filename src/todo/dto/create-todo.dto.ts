import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
 
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title : string;

    @IsOptional()
    @IsBoolean()
    completed : boolean;

}
