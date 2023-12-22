import { Controller, Get } from '@nestjs/common'; 
import { MessagePattern } from '@nestjs/microservices';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { SignInEmail } from './dto/signin-user.email';
import { EmailService } from './email.service';
import { Language } from './enum/language.enum';
import { EmailBuilder } from './interface/email-builder';
@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @MessagePattern("createUserEmail")
  async createUserEmail(
    data: { emailDto: any; authenticatedUser: AuthenticatedUserDto },
  ): Promise<any> {

    const { emailDto, authenticatedUser } = data;

    let email = new SignInEmail();
    email.code = emailDto.verificationCode;
    email.nameSurname = authenticatedUser.name + " " + authenticatedUser.surname;
    email.to = authenticatedUser.email;
    email.language = authenticatedUser.lang ? authenticatedUser.lang : Language.EN;

    await this.emailService.sendMail(new EmailBuilder(email));

  }


  @MessagePattern("signInEmail")
  async SignInEmail(
    data: { emailDto: any; authenticatedUser: AuthenticatedUserDto },
  ): Promise<any> {

    const { emailDto, authenticatedUser } = data;

    let email = new SignInEmail();
    email.code = emailDto.verificationCode;
    email.nameSurname = authenticatedUser.name + " " + authenticatedUser.surname;
    email.to = authenticatedUser.email;
    email.language = authenticatedUser.lang ? authenticatedUser.lang : Language.EN;

    await this.emailService.sendMail(new EmailBuilder(email));

  }


}
