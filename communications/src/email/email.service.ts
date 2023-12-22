import { Injectable } from '@nestjs/common'; 
import { IEmailBase } from './interface/email-base.abstract'; 
import { EmailBuilder } from './interface/email-builder';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService, 
  ) { }


  async sendMail<D extends IEmailBase>(emailBuilder: EmailBuilder<D>): Promise<void> {

    let mailContent = await emailBuilder.build();

    await this.mailerService.sendMail({
      to: emailBuilder.emailData.to,
      subject: emailBuilder.emailData.subject,
      template: __dirname + '/templates/en/' + emailBuilder.emailData.getTemplate(),
      context: emailBuilder.emailData,
    });
  }

 
}