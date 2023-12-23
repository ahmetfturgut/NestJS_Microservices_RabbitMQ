  
import { Language } from "../enum/language.enum";
import { MAIL_TEMPLATE_PATH } from "../enum/mail.enum";
import { IEmailBase } from "../interface/email-base.abstract";


export class SignInEmail implements IEmailBase {
    to: string;
    language: Language;
    subject: string = "Email Code Verification"
    nameSurname: string
    code: string;

    getTemplate(): string {
        return MAIL_TEMPLATE_PATH.CODE_MAIL;
    }
}
