import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";

@Injectable()
export class AppService {
  constructor(
    @Inject("USER_SERVICE") private readonly clientServiceUsers: ClientProxy,
    @Inject("BLOG_SERVICE") private readonly clientServiceBlogs: ClientProxy

  ) { }

  pingServiceUser() {
    const startTs = Date.now();
    const pattern = { cmd: "ping" };
    const payload = {};
    return this.clientServiceUsers
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }

  pingServiceBlog() {
    const startTs = Date.now();
    const pattern = { cmd: "ping" };
    const payload = {};
    return this.clientServiceBlogs
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }
}