import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ContactEmailRequestDto, CreateUserRequestDto, SignInRequestDto, VerifySignInAndUpRequestDto } from "./dto/users.request.dto";
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
        const messagePayload = { verificationDto };
        return this.clientUserService.send("signIn", messagePayload);
    }

    async verifySignIn(verificationDto: VerifySignInAndUpRequestDto) {
        const messagePayload = { verificationDto, };
        return this.clientUserService.send("verifySignIn", messagePayload);
    }

    async contactEmail(emailDto: ContactEmailRequestDto) {
        const messagePayload = { emailDto };
        return this.clientUserService.send("contactEmail", messagePayload);
    }

}