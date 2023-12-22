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
import { SignInResponseDto } from './dto/user.response.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject("COMMUNICATION_SERVICE") private readonly clientBlogService: ClientProxy,
  ) {
  }

  @MessagePattern("createUser")
  async createUser(
    data: { userDto: CreateUserRequestDto; authenticatedUser: AuthenticatedUserDto },
  ): Promise<any> {

    const { userDto, authenticatedUser } = data;

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
    return this.clientBlogService.send("createUserEmail", messagePayload);

  }

  @MessagePattern("verifySignUp")
  async verifySignUp(
    data: { verificationDto: VerifySignInAndUpRequestDto; authenticatedUser: AuthenticatedUserDto },
  ): Promise<any> {

    const { verificationDto, authenticatedUser } = data;

    let auth = await this.authService.verifySignUpToken(verificationDto.token, verificationDto.verificationCode);
    let user = await this.userService.findById(auth.userId)
    user.state = UserState.ACTIVE;
    return await this.userService.update(user);

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

    //TODO send Email

    var response = new SignInResponseDto();
    response.token = auth.token;
    this.logger.debug("signIn done.");
    return response;
  }



  @MessagePattern("checkToken")
  async validate(
    @Body() request: any
  ): Promise<any> {

    let user = await this.authService.verifyToken(request.jwt);
    if (!user) {
      throw new UnauthorizedException();
    }
    user.id = user["_id"];
    return user;
  }

}
