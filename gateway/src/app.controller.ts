import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping-users')
  pingServiceA() {
    console.log("asdf")
    return this.appService.pingServiceUser();
  }

  @Get('/ping-blogs')
  pingServiceB() {
    return this.appService.pingServiceBlog();
  }

  @Get('/ping-all')
  pingAll() {
    return zip(
      this.appService.pingServiceUser(),
      this.appService.pingServiceBlog(),
    ).pipe(
      map(([pongServiceA, pongServiceB]) => ({
        pongServiceA,
        pongServiceB,
      })),
    );
  }
}