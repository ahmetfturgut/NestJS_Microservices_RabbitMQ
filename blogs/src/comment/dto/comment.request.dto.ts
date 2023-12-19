 
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentRequestDto { 
 
    @IsString()
    @IsNotEmpty()
    title: string;
 
    @IsString()
    @IsNotEmpty()
    content: string;
 

}
