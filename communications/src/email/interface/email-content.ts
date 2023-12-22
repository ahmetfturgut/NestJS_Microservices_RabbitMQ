import { Language } from "../enum/language.enum";

export interface IEmailContent {
	subject: string;
	language: Language
	context: object;
	template: string;
	to: string;

}
