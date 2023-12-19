import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"; 
import { Repository } from '../_common/repository/repository';
import { Comment, CommentDocument } from './like.model';

@Injectable()
export class CommentRepository extends Repository<Comment, CommentDocument>{

    constructor(@InjectModel(Comment.name) protected readonly mongoModel: Model<CommentDocument>) {
        super(mongoModel);
    }

   

}