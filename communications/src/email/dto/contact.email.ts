
import { Language } from "../enum/language.enum";
import { MAIL_TEMPLATE_PATH } from "../enum/mail.enum";
import { IEmailBase } from "../interface/email-base.abstract";


export class ContactEmailRequestDto {
    email: string
    name: string;
    surname: string;
    title: string;
    content: string;

}

export class ContactEmail implements IEmailBase {
    to: string;
    language: Language;
    email: string
    subject: string = "Contant Email"
    nameSurname: string
    title: string;
    content: string;

    getTemplate(): string {
        return MAIL_TEMPLATE_PATH.CONTACT_EMAIL;
    }
}
