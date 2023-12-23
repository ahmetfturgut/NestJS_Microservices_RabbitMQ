import { Controller, Post, Body, UsePipes, ValidationPipe, Inject, Logger } from '@nestjs/common';
import { Public } from '../core/decorators/public.decorator';
 import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'; 
import { CreateUserRequestDto, VerifySignInAndUpRequestDto, SignInRequestDto, ContactEmailRequestDto } from './dto/users.request.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) { }


  @Public()
  @Post("createUser")
  async createUser(
    @Body() request: CreateUserRequestDto
  ): Promise<any> {

    let newUser = new CreateUserRequestDto();
    newUser.email = request.email;
    newUser.name = request.name;
    newUser.surname = request.surname;
    newUser.password = request.password;

    return await this.userService.createUser(newUser);
  }


  @Public()
  @Post("verifySignUp")
  async verifySignUp(
    @Body() request: VerifySignInAndUpRequestDto
  ): Promise<any> {

    let verificationDto = new VerifySignInAndUpRequestDto()
    verificationDto.token = request.token;
    verificationDto.verificationCode = request.verificationCode;

    return await this.userService.verifySignUp(verificationDto);
  }


  @Public()
  @Post("signIn")
  async signIn(
    @Body() request: SignInRequestDto
  ): Promise<any> {

    this.logger.debug('started signIn() ', UserController.name);

    let signInDto = new SignInRequestDto()
    signInDto.email = request.email;
    signInDto.password = request.password;

    return await this.userService.signIn(signInDto);
  }
 
  @Public()
  @Post("verifySignIn")
  async verifySignIn(
    @Body() request: VerifySignInAndUpRequestDto
  ): Promise<any> {

    this.logger.debug('started verifySignIn() ', UserController.name);

    let verifySignInDto = new VerifySignInAndUpRequestDto()
    verifySignInDto.token = request.token;
    verifySignInDto.verificationCode = request.verificationCode;

    this.logger.debug("verifySignIn done.");
    return await this.userService.verifySignIn(verifySignInDto);
 
  }

  @Public()
  @Post("contactEmail")
  async contactEmail(
    @Body() request: ContactEmailRequestDto
  ): Promise<any> {

    this.logger.debug('started contactEmail() ', UserController.name);

    let emailDto = new ContactEmailRequestDto()
    emailDto.email = request.email;
    emailDto.name = request.name;
    emailDto.surname = request.surname;
    emailDto.title = request.title;
    emailDto.content = request.content;

    this.logger.debug("contactEmail done.");
    return await this.userService.contactEmail(emailDto);
 
  }
}
