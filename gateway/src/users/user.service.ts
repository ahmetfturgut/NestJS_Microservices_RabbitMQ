import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserRequestDto, SignInRequestDto, VerifySignInAndUpRequestDto } from "./dto/create-user.dto";
@Injectable()
export class UserService {
    constructor(
        @Inject("USER_SERVICE") private readonly clientUserService: ClientProxy,

    ) { }

    async createUser(user: CreateUserRequestDto) {
        return this.clientUserService.send("createUser", user);
    }

    async verifySignUp(verificationDto: VerifySignInAndUpRequestDto) {
        return this.clientUserService.send("verifySignUp", verificationDto);
    }

    async signIn(verificationDto: SignInRequestDto) {
        return this.clientUserService.send("signIn", verificationDto);
    }


}