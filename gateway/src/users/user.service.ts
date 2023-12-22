import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserRequestDto, SignInRequestDto, VerifySignInAndUpRequestDto } from "./dto/create-user.dto";
import { AuthenticatedUserDto } from "src/auth/authenticated-user.dto";
@Injectable()
export class UserService {
    constructor(
        @Inject("USER_SERVICE") private readonly clientUserService: ClientProxy,

    ) { }

    async createUser(userDto: CreateUserRequestDto) {
        const messagePayload = { userDto };
        return this.clientUserService.send("createUser", messagePayload);
    }

    async verifySignUp(verificationDto: VerifySignInAndUpRequestDto) {
        const messagePayload = { verificationDto };
        return this.clientUserService.send("verifySignUp", messagePayload);
    }

    async signIn(verificationDto: SignInRequestDto) {
        const messagePayload = { verificationDto, };
        return this.clientUserService.send("signIn", messagePayload);
    }


}