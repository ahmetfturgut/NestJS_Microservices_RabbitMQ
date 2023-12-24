
import { CanActivate, ExecutionContext, Inject, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, timeout } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { AuthService } from "src/auth/auth.service";

export class JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject('USER_SERVICE') private readonly client: ClientProxy,
        private readonly authManager: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest();

        try {
            let token = req.headers['authorization']?.split(' ')[1];
            let userString = await this.authManager.getCache("auth:" + token)
            let res: any;
            if (userString) {
                let user = JSON.parse(userString);
                if (!this.authManager.isTokenExpired(user.timestamp)) {
                    res = user;
                } else {
                    await this.authManager.deleteCache("auth:" + token)
                    this.client.send("signOut", { userId: user.id })
                    return false;
                }
            } else { 
                res = await lastValueFrom(this.client.send("checkToken", { jwt: token }).pipe(timeout(5000))) 
            }
 
            req.user = res;
            return true;
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }
}