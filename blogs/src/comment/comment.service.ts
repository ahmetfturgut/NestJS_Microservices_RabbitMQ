import { Injectable } from '@nestjs/common'; 
import { Service } from '../_common/service/service';
import { Comment, CommentDocument } from './comment.model';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService extends Service<Comment, CommentDocument, CommentRepository> {

  constructor(protected repository: CommentRepository) { super(repository) }


}
