import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { UserModule } from './users/user.module'; 
import * as config from './core/environment/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerWinstonModule } from './core/module/winston.module'; 
import { JwtModule } from '@nestjs/jwt';
import { tokenConfig } from './core/environment/config';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoConfig.path),
    JwtModule.register({
      secret: tokenConfig.jwtSacretKey,
      signOptions: { expiresIn: config.expiresTimeConfig.authExpiresIn },
    }),
    LoggerWinstonModule,
    UserModule],
  controllers: [AppController],
  providers: [
   
    AppService],
})
export class AppModule { }
