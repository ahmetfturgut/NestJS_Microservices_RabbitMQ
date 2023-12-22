import { Language } from "../enum/language.enum";

 

export class AuthenticatedUserDto {

    public id: string;
    public email: string; 
    public lang: Language; 
    public name?: string;
    public surname?: string;
    public isUser: boolean = false;
    public isSystemUser: boolean = false;
    static from(user: any): AuthenticatedUserDto {
        var authUser = new AuthenticatedUserDto();
        authUser.id = user.id;
        authUser.email = user.email; 
        authUser.lang = user.lang;
        authUser.name = user.name;
        authUser.surname = user.surname; 
        return authUser;
    }

}



