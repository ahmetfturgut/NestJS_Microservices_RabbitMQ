import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';  
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { mailConfig } from 'src/core/environment/config';
import { EmailService } from './email.service'; 
import { EmailController } from './email.controller';

@Module({
  imports: [
    MailerModule.forRoot({
        transport: {
            host: mailConfig.mailHost,
            port: mailConfig.mailPort,
            secure: true,
            auth: {
                user: mailConfig.mailUser,
                pass: mailConfig.mailPassword,
            },
        },
        defaults: {
            from: '"No Reply" <no-reply@localhost>',
        },
        preview: true,
        template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),  
            options: {
                strict: true,
            },
        },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule { }

 
 