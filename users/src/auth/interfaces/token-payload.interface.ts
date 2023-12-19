  
import { User } from "src/users/user.model";
import { Auth } from "../auth.model";

export interface ITokenPayload {
    authId : Auth["id"];
    userId: User["id"]; 
}