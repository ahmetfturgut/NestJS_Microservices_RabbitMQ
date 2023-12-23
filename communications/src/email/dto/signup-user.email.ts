 
import { Language } from "../enum/language.enum"; 
import { MAIL_TEMPLATE_PATH } from "../enum/mail.enum";
import { IEmailBase } from "../interface/email-base.abstract";


export class SignUpEmail implements IEmailBase {
    to: string;
    language: Language;
    subject: string = "Please enter the code to verify your account."
    nameSurname: string
    code: string;

    getTemplate(): string {
        return MAIL_TEMPLATE_PATH.CONFIRMATION_SING_UP;
    }
}
