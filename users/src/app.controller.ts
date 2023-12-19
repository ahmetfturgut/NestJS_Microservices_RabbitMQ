import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Controller()
export class AppController {
  @MessagePattern({ cmd: "ping" })
  ping(_: any) {
    console.log("asdfaaaaaa")
    return of("pong 2").pipe(delay(1000));
  }
}