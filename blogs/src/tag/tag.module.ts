import { Module } from "@nestjs/common";
import { Tag, TagSchema } from "./tag.model";
import { TagRepository } from "./tag.repository";
import { TagService } from "./tag.service";
import { TagController } from "./tag.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])
  ],
  controllers: [TagController],
  exports: [TagService],
  providers: [TagService, TagRepository],
})
export class TagModule { }
