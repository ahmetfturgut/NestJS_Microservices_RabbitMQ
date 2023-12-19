import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from './core/environment/config';
import { LoggerWinstonModule } from './core/module/winston.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoConfig.path),
    LoggerWinstonModule, 
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
