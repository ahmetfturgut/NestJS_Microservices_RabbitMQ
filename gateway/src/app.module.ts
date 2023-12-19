import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './core/guards/auth-guard';
import { LoggerWinstonModule } from './core/module/winston.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
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
      },
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
      },
    ]),
    LoggerWinstonModule,
    BlogModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService]
})
export class AppModule { }