 
import { MAIL_ENUMS } from "../enum/mail.enum"; 
import { Language } from "../enum/language.enum";
import { IEmailBase } from "../interface/email-base.abstract";


export class SignInEmail implements IEmailBase {
    to: string;
    language: Language;
    subject: string = "Email Code Verification"
    nameSurname: string
    code: string;

    getTemplate(): string {
        return MAIL_ENUMS.MAIL_TEMPLATE_PATH.CODE_MAIL;
    }
}
