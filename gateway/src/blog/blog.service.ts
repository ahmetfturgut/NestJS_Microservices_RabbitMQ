import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBlogRequestDto } from './dto/blog.request.dto';
import { CreateBlogResponseDto } from './dto/blog.response.dto';

@Injectable()
export class BlogService {

  constructor(
    @Inject("BLOG_SERVICE") private readonly clientBlogService: ClientProxy,
  ) { }
  
  async createBlog(blog: CreateBlogResponseDto) {
    return this.clientBlogService.send("createBlog", blog);
  }

}
