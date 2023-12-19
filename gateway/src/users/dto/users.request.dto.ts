
import {   IsEmail, IsEnum ,IsString } from 'class-validator'; 
import { UserType } from '../enum/usertype.enum'; 
import { ApiProperty } from '@nestjs/swagger';


// export class ResendVerifyEmailRequestDto {
//     @ApiProperty()
//     @IsEmail()
//     readonly email: User["email"];

//     @ApiProperty()
//     @IsEnum(UserType)
//     readonly userType: UserType;
// }

// export class VerifyEmailRequestDto {
//     @ApiProperty()
//     @IsString()
//     readonly token: string;
// }

// export class SignInRequestDto {
//     @ApiProperty()
//     @IsEmail()
//     readonly email: User["email"];

//     @ApiProperty()
//     @IsString()
//     readonly password: User["password"];


// }
// export class VerifySignInAndUpRequestDto {
//     @ApiProperty()
//     @IsString()
//     token: string;

//     @ApiProperty()
//     @IsString()
//     verificationCode: string;

// }

// export class ForgetPasswordRequestDto {
//     @ApiProperty()
//     @IsEmail()
//     readonly email: User["email"];

//     @ApiProperty()
//     @IsEnum(UserType)
//     readonly userType: UserType;
// }
