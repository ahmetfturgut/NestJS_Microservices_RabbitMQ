import { Module } from "@nestjs/common";
import { Comment, CommentSchema } from "./comment.model";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule { }
