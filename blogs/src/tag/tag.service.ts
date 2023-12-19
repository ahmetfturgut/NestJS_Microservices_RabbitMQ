import { Injectable } from '@nestjs/common'; 
import { Service } from '../_common/service/service';
import { Tag, TagDocument } from './tag.model';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService extends Service<Tag, TagDocument, TagRepository> {

  constructor(protected repository: TagRepository) { super(repository) }


}
