import { Module } from "@nestjs/common";
import { Comment, CommentSchema } from "./like.model";
import { CommentRepository } from "./like.repository";
import { CommentService } from "./like.service";
import { CommentController } from "./like.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule { }
