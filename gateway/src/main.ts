import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { AllExceptionsFilter } from './core/filters/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './core/guards/auth-guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); 
  app.useGlobalPipes(new ValidationPipe());
  const clientProxy = app.get('USER_SERVICE');
  app.useGlobalGuards(new JwtAuthGuard(new Reflector(),clientProxy));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
}
bootstrap();
