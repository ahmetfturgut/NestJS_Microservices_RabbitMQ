import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BLOG_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'blogs_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ]),
  ],

  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule { }
