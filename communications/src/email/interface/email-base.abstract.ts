import { Language } from "../enum/language.enum";
  
export interface IEmailBase {
    to: string;
    subject: string;
    language: Language;
    getTemplate(): string;
}

