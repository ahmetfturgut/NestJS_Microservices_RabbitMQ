import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common"; 

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'communications_queue',
      queueOptions: {
        durable: false
      },
    },
  }); 
  app.listen();
  logger.log("Microservice communications is listening")
  console.log("Microservice communications is listening")

}
bootstrap();
