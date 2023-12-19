import { UserState } from "../enum/user.state";
import { UserType } from "../enum/usertype.enum";  

export class AuthenticatedUserDto {

    public id: string;
    public email: string;
    public type: UserType;
    public state: UserState;
    public name?: string;
    public surname?: string;
    public isUser: boolean = false;
    public isSystemUser: boolean = false;
    static from(user: any): AuthenticatedUserDto {
        var authUser = new AuthenticatedUserDto();
        authUser.id = user.id;
        authUser.email = user.email;
        authUser.type = user.type;
        authUser.state = user.state;
        authUser.name = user.name;
        authUser.surname = user.surname;
        authUser.isUser = user.type == UserType.USER;
        authUser.isSystemUser = user.type == UserType.SYSTEM_USER;
        return authUser;
    }

}



