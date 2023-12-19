import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogRequestDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    // categories: Category["id"][];
    categories

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    // tags: Tag["id"][];
    tags
}

export class UpdateBlogRequestDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    content: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    image: string;


}


export class GetBlogRequestDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;


}
