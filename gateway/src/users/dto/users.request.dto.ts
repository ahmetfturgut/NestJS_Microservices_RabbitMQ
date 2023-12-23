import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, Max, Min } from "class-validator";
import { RegexClass } from "src/core/tools/enums/validation.enum";

export class CreateUserRequestDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty()
    @IsString()
    @Matches(RegexClass.PASSWORD, { message: "password error" })
    password: string;

}

export class VerifySignInAndUpRequestDto {
    @ApiProperty()
    @IsString()
    token: string;

    @ApiProperty()
    @IsString()
    verificationCode: string;

}

export class UpdateUserRequestDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    surname: string;


}

export class SignInRequestDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;


}


export class ContactEmailRequestDto {
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    surname: string; 

    @ApiProperty()
    @IsString()
    title: string;
    
    @ApiProperty()
    @IsString()
    content: string;

}

