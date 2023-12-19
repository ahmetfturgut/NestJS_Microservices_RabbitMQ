import { Module } from "@nestjs/common";
import { Blog, BlogSchema } from "./blog.model";
import { BlogRepository } from "./blog.repository";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { MongooseModule } from "@nestjs/mongoose"; 
import { TagModule } from "src/tag/tag.module";
import { CategoryModule } from "src/category/category.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    CategoryModule,
    TagModule
  ],

  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogModule { }
