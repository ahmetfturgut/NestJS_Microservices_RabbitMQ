import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { expiresTimeConfig, tokenConfig } from 'src/core/environment/config';
import { JwtStrategy } from 'src/core/strategy/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: tokenConfig.jwtSacretKey,
      signOptions: { expiresIn: expiresTimeConfig.authExpiresIn },
    })
  ],
  exports: [AuthService, JwtModule],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
