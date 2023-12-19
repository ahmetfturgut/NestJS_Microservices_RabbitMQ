 
import { Injectable, UnauthorizedException } from '@nestjs/common'; 
import { Request } from 'express'; 
import { tokenConfig } from '../environment/config'; 
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; 
import { AuthService } from 'src/auth/auth.service';
import { ITokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { AuthenticatedUserDto } from 'src/users/dto/authenticated-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
			private authService: AuthService,
			) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
			secretOrKey: tokenConfig.jwtSacretKey,
			passReqToCallback: true			
		});
	}

	async validate(req: Request & {ipAddress: string}, payload: ITokenPayload): Promise<AuthenticatedUserDto> {
 
		let user = await this.authService.checkAndGetAuthenticatedUser(payload.authId);		
		if(!user) { 
			throw new UnauthorizedException();
		}
		return user;
	}
}