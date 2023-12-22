import { NestFactory, Reflector } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'; 
import { appConfig } from "./core/environment/config";

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [appConfig.rabbitmqHost],
      queue: appConfig.rabbitmqUsersQueue,
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