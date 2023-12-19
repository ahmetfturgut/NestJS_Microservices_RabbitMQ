import { NestFactory, Reflector } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'; 

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));  
  app.listen();
  logger.log("Microservice users is listening")
  console.log("Microservice users is listening")

}
bootstrap();