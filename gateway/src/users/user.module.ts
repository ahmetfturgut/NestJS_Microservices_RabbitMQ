import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

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
      }
    ]),
    AuthModule
  ],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
