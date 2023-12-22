import { Controller, Body, Inject, Logger, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { ApiException } from 'src/_common/api/api.exeptions';
import { ApiError } from 'src/_common/api/api.error';
import { User } from './user.model';
import { AuthService } from 'src/auth/auth.service';
import { SignInRequestDto, VerifySignInAndUpRequestDto } from './dto/users.request.dto';
import { UserState } from './enum/user.state';
import { AuthendicatedUserInfoResponseDto, SignInResponseDto, SignUpResponseDto, VerifySignInResponseDto } from './dto/user.response.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { UserType } from './enum/usertype.enum';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject("COMMUNICATION_SERVICE") private readonly clientCommunicationService: ClientProxy,
  ) {
  }

  @MessagePattern("createUser")
  async createUser(
    data: { userDto: CreateUserRequestDto; authenticatedUser: AuthenticatedUserDto },
  ): Promise<any> {

    this.logger.debug('started createUser() ', UserController.name);
    const { userDto } = data;

    if (await this.userService.exists({ email: userDto.email })) {
      throw ApiException.buildFromApiError(ApiError.USER_EMAIL_EXISTS);
    }
    
    let newUser = new User();
    newUser.email = userDto.email;
    newUser.name = userDto.name;
    newUser.surname = userDto.surname;
    newUser.password = userDto.password;

    let user = await this.userService.save(newUser);
    newUser.id = user.id;
    let auth = await this.authService.createVerifySignUpToken(newUser);

    const messagePayload = { emailDto: { verificationCode: auth.verificationCode }, authenticatedUser: auth.user };
    this.clientCommunicationService.send("createUserEmail", messagePayload)
      .subscribe({
        next: (response) => {
          this.logger.debug('Email sent successfully');
        },
        error: (error) => {
          this.logger.error('Error sending email:', error);
        },
        complete: () => {
          this.logger.debug('Email sending process completed');
        }
      });

    let response = new SignUpResponseDto();
    response.token = auth.token;
    this.logger.debug("createUser done.");
    return response;

  }

  @MessagePattern("verifySignUp")
  async verifySignUp(
    data: { verificationDto: VerifySignInAndUpRequestDto; authenticatedUser: AuthenticatedUserDto },
  ): Promise<any> {

    this.logger.debug('started verifySignUp() ', UserController.name);
    const { verificationDto, authenticatedUser } = data;

    let auth = await this.authService.verifySignUpToken(verificationDto.token, verificationDto.verificationCode);
    let user = await this.userService.findById(auth.userId)
    user.state = UserState.ACTIVE;

    this.logger.debug("verifySignUp done.");
    await this.userService.update(user);
    return;
  }

  @MessagePattern("signIn")
  async signIn(
    data: { verificationDto: SignInRequestDto; authenticatedUser: AuthenticatedUserDto },
  ): Promise<SignInResponseDto> {

    this.logger.debug('started signIn() ', UserController.name);

    const { verificationDto, authenticatedUser } = data;

    let user = await this.userService.getUserByEmail(verificationDto.email);
    if (!user) {
      this.logger.error('user not found. wrong email');
      throw ApiException.buildFromApiError(ApiError.WRONG_EMAIL_OR_PASSWORD);
    }

    if (user.state != UserState.ACTIVE) {
      this.logger.error('unverified user');
      throw ApiException.buildFromApiError(ApiError.WRONG_EMAIL_OR_PASSWORD);
    }

    let isValidPassword = this.authService.validateUserPassword(user, verificationDto.password)

    if (!isValidPassword) {
      this.logger.debug("User password not validated.");
      throw ApiException.buildFromApiError(ApiError.WRONG_EMAIL_OR_PASSWORD);
    }

    let auth = await this.authService.createVerifySignInToken(user);
    this.logger.debug("authId: ", auth.id);

    console.log("verification code: " + auth.verificationCode);

    const messagePayload = { emailDto: { verificationCode: auth.verificationCode }, authenticatedUser: user };
    this.clientCommunicationService.send("signInEmail", messagePayload)
      .subscribe({
        next: (response) => {
          this.logger.debug('Email sent successfully');
        },
        error: (error) => {
          this.logger.error('Error sending email:', error);
        },
        complete: () => {
          this.logger.debug('Email sending process completed');
        }
      });

    var response = new SignInResponseDto();
    response.token = auth.token;
    this.logger.debug("signIn done.");
    return response;
  }

  @MessagePattern("verifySignIn")
  async verifySignIn(
    data: { verificationDto: VerifySignInAndUpRequestDto; authenticatedUser: AuthenticatedUserDto },
  ): Promise<VerifySignInResponseDto> {

    this.logger.debug('started verifySignIn() ', UserController.name);
    const { verificationDto } = data;

    let auth = await this.authService.verifySignInToken(verificationDto.token, verificationDto.verificationCode);
    let user = await this.userService.findById(auth.userId);

    let response = new VerifySignInResponseDto();
    let accessToken = await this.authService.createSignInToken(user);
    response.accessToken = accessToken.token;
    response.authendicatedUser = new AuthendicatedUserInfoResponseDto();
    response.authendicatedUser.id = user.id;
    response.authendicatedUser.email = user.email;
    response.authendicatedUser.type = user.type;
    response.authendicatedUser.name = user.name;
    response.authendicatedUser.surname = user.surname;
    response.authendicatedUser.isSystemUSer = (user.type == UserType.SYSTEM_USER);
    user.lastLoginDate = new Date();

    await this.userService.update(user);

    this.logger.debug("verifySignIn done.");
    return response;
  }

}
