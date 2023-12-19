import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Category } from "src/category/category.model";
import { Tag } from "src/tag/tag.model";

 

export class CreateBlogRequestDto {
    
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    content: string; 
    
    @IsString()
    @IsNotEmpty()
    image: string;
    
    @IsArray()
    @IsNotEmpty()
    categories: Category["id"][];
    
    @IsArray()
    @IsNotEmpty()
    tags: Tag["id"][];

}

export class UpdateBlogRequestDto {
    
    @IsString()
    @IsNotEmpty()
    id: string;
    
    
    @IsString()
    @IsOptional()
    title: string;
    
    @IsString()
    @IsOptional()
    content: string;

    
    @IsString()
    @IsOptional()
    image: string;


}


export class GetBlogRequestDto {
    
    @IsString()
    @IsNotEmpty()
    id: string; 


}
