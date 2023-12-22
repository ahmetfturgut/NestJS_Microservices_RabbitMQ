import { Body, Controller, UnauthorizedException } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @MessagePattern("checkToken")
  async validate(
    @Body() request: any
  ): Promise<any> {

    let user = await this.authService.verifyToken(request.jwt, undefined, true);
    if (!user) {
      throw new UnauthorizedException();
    }
    user.id = user["_id"];
    return user;
  }
}