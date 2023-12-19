import { Injectable } from '@nestjs/common';  
import { Blog, BlogDocument } from './blog.model';
import { BlogRepository } from './blog.repository';
import { Service } from 'src/_common/service/service';

@Injectable()
export class BlogService extends Service<Blog, BlogDocument, BlogRepository> {

  constructor(protected repository: BlogRepository) { super(repository) }


}
