import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBlogRequestDto, DeleteBlogRequestDto } from './dto/blog.request.dto';
import { CreateBlogResponseDto, GetBlogResponseDto, UpdateBlogResponseDto } from './dto/blog.response.dto'; 
import { AuthenticatedUserDto } from 'src/auth/dto/authenticated-user.dto';

@Injectable()
export class BlogService {

  constructor(
    @Inject("BLOG_SERVICE") private readonly clientBlogService: ClientProxy,
  ) { }

  async createBlog(blogDto: CreateBlogResponseDto, authenticatedUser: AuthenticatedUserDto) {
    const messagePayload = { blogDto, authenticatedUser };
    return this.clientBlogService.send("createBlog", messagePayload);
  }

  async updateBlog(blogDto: UpdateBlogResponseDto, authenticatedUser: AuthenticatedUserDto) {
    const messagePayload = { blogDto, authenticatedUser };
    return this.clientBlogService.send("updateBlog", messagePayload);
  }

  async getBlog(blogDto: GetBlogResponseDto, authenticatedUser: AuthenticatedUserDto) {
    const messagePayload = { blogDto, authenticatedUser };
    return this.clientBlogService.send("getBlog", messagePayload);
  }

  async getAllBlogByUserId( authenticatedUser: AuthenticatedUserDto) {
    const messagePayload = { authenticatedUser };
    return this.clientBlogService.send("getAllBlogByUserId", messagePayload);
  }

  async getAllBlog() {
    const messagePayload = {};
    return this.clientBlogService.send("getAllBlog", messagePayload);
  } 

  async deleteBlog(blogDto: DeleteBlogRequestDto, authenticatedUser: AuthenticatedUserDto) {
    const messagePayload = { blogDto, authenticatedUser };
    return this.clientBlogService.send("deleteBlog", messagePayload);
  }


}
