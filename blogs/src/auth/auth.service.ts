
import { Injectable } from '@nestjs/common'; 
import { ApiException } from '../_common/api/api.exeptions'; 
import { ITokenPayload } from './interfaces/token-payload.interface';
import { ApiError } from '../_common/api/api.error';  
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

	constructor( 
		private jwtService: JwtService,
	) { 
	}

	  

	  
	 

}