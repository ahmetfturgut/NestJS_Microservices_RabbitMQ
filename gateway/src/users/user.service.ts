import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ContactEmailRequestDto, CreateUserRequestDto, SignInRequestDto, VerifySignInAndUpRequestDto } from "./dto/users.request.dto";
import { lastValueFrom } from "rxjs";
import { AuthService } from "src/auth/auth.service";
@Injectable()
export class UserService {
    constructor(
        @Inject("USER_SERVICE") private readonly clientUserService: ClientProxy,
        private readonly cacheManager: AuthService 
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
        const user = await lastValueFrom(this.clientUserService.send('verifySignIn', messagePayload));
        if (user.accessToken) {
            const token = user.accessToken;
            user.authendicatedUser.timestamp = Date.now();
            await this.cacheManager.setCache(`auth:${token}`, JSON.stringify(user.authendicatedUser));

            return { token, user: user.authendicatedUser };
        } else {
            throw new Error('Authentication failed');
        }
    }

    async contactEmail(emailDto: ContactEmailRequestDto) {
        const messagePayload = { emailDto };
        return this.clientUserService.send("contactEmail", messagePayload);
    }

}