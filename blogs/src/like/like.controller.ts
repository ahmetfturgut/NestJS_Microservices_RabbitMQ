import { Controller, Get, Post, Body, UsePipes, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston'; 
import { CreateCommentRequestDto } from './dto/like.request.dto';
import { CommentService } from './like.service';
import { Comment } from './like.model';
import { MessagePattern } from '@nestjs/microservices';
 
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
    } 
    
    @MessagePattern("createComment")
    async createComment(
        @Body() request: CreateCommentRequestDto
    ): Promise<any> {

        this.logger.debug('started createComment()', CommentController.name);

        let comment = new Comment();
        comment.title = request.title;
        comment.content = request.content;

        await this.commentService.save(comment)

        //Email atılacak
    }



}
