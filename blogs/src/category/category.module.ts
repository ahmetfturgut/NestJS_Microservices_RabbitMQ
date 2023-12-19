import { Module } from "@nestjs/common"; 
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./category.model";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule { }
