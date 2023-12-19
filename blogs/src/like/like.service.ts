import { Injectable } from '@nestjs/common'; 
import { Service } from '../_common/service/service';
import { Comment, CommentDocument } from './like.model';
import { CommentRepository } from './like.repository';

@Injectable()
export class CommentService extends Service<Comment, CommentDocument, CommentRepository> {

  constructor(protected repository: CommentRepository) { super(repository) }


}
