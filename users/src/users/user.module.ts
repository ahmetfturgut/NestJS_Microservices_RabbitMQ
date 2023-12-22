import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    ClientsModule.register([
      {
        name: 'COMMUNICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'communications_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ]),
  ],

  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule { }
