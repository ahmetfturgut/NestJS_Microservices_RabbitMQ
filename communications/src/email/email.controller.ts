import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { SignInEmail } from './dto/signin-user.email';
import { EmailService } from './email.service';
import { Language } from './enum/language.enum';
import { EmailBuilder } from './interface/email-builder';
import { ContactEmail, ContactEmailRequestDto } from './dto/contact.email';
import { SignUpEmail } from './dto/signup-user.email';
import { mailConfig } from 'src/core/environment/config';
@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @MessagePattern("createUserEmail")
  async createUserEmail(
    data: { emailDto: any; authenticatedUser: AuthenticatedUserDto },
  ): Promise<any> {

    const { emailDto, authenticatedUser } = data;

    let email = new SignUpEmail();
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

  @MessagePattern("contactEmail")
  async contactEmail(
    data: { emailDto: ContactEmailRequestDto },
  ): Promise<any> {

    const { emailDto } = data;

    let email = new ContactEmail();
    email.nameSurname = emailDto.name + " " + emailDto.surname;
    email.to = mailConfig.adminEmail;
    email.email = emailDto.email;
    email.title = emailDto.title;
    email.content = emailDto.content;
    email.language = Language.TR;

    await this.emailService.sendMail(new EmailBuilder(email));

  } 

}
