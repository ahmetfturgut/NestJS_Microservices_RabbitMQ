
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagRequestDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
