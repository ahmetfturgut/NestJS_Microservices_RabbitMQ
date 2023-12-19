


import { CanActivate, ExecutionContext, Inject, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { timeout } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

export class JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject('USER_SERVICE') private readonly client: ClientProxy
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
            const res = await this.client.send("checkToken",
                { jwt: req.headers['authorization']?.split(' ')[1] })
                .pipe(timeout(5000))
                .toPromise();

            req.user = res;
            return true;
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }
}