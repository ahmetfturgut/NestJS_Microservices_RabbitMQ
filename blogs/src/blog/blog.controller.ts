import { Controller, Get, Post, Body, UsePipes, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston'; 
import { CreateBlogRequestDto, GetBlogRequestDto, UpdateBlogRequestDto } from './dto/blog.request.dto';
import { BlogService } from './blog.service';
import { Blog } from './blog.model'; 
import { GetBlogResponseDto } from './dto/blog.response.dto';
import { BlogState } from './enum/blog.state';
import { ApiException } from '../_common/api/api.exeptions';
import { ApiError } from '../_common/api/api.error';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tag/tag.service';
import { CategoryState } from '../category/enum/category.state';
import { TagState } from '../tag/enum/tag.state';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { AuthenticatedUserDto } from 'src/auth/dto/authenticated-user.dto';

 
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly categoryService: CategoryService,
        private readonly tagService: TagService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
    }
 
    @MessagePattern("createBlog")
    async createBlog(
        @Ctx() context: RmqContext,
        @Body() request: CreateBlogRequestDto, 
        @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    ): Promise<any> { 
        console.log("geldi")
        console.log("authenticatedUser",authenticatedUser)
        this.logger.debug('started createBlog()', BlogController.name);

        let blog = new Blog();
        blog.title = request.title;
        blog.author = request.id;
        blog.content = request.content;
        blog.image = request.image; 
        blog.categories = [];
        blog.tags = [];

        //check category
        for (let i = 0; i < request.categories.length; i++) {
            let category = await this.categoryService.findById(request.categories[i]);
            if (category.state == CategoryState.ACTIVE) {
                blog.categories.push(category.id);
            }
        }

        if (blog.categories.length == 0) {
            this.logger.error('not found category');
            throw ApiException.buildFromApiError(ApiError.REQUIRED_CATEGORY);
        }
        //check category

        //check tag
        for (let i = 0; i < request.tags.length; i++) {
            let tag = await this.tagService.findById(request.tags[i]);
            if (tag.state == TagState.ACTIVE) {
                blog.tags.push(tag.id);
            }
        }

        if (blog.tags.length == 0) {
            this.logger.error('not found tag ');
            throw ApiException.buildFromApiError(ApiError.REQUIRED_TAG);
        }
        //check tag 

        await this.blogService.save(blog);

        //Email atılacak
    }

    // @UsePipes(new ValidationPipe())
    // @Post("updateBlog")
    // async updateBlog(
    //     @Body() request: UpdateBlogRequestDto,
    //     @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    // ): Promise<any> {

    //     this.logger.debug('started updateBlog()', BlogController.name);
    //     let blog = await this.blogService.findById(request.id);

    //     if (blog.author == authenticatedUser.id) {
    //         this.logger.error("You are not authorized.");
    //         throw ApiException.buildFromApiError(ApiError.NOT_AUTHORIZED);
    //     }

    //     blog.title = request.title;
    //     blog.content = request.content;
    //     blog.image = request.image;
    //     blog.author = authenticatedUser.id;

    //     await this.blogService.update(blog);

    // }

    // @UsePipes(new ValidationPipe())
    // @Post("getBlog")
    // async getBlog(
    //     @Body() request: GetBlogRequestDto,
    //     @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    // ): Promise<GetBlogResponseDto> {

    //     this.logger.debug('started getBlog()', BlogController.name);

    //     let blog = await this.blogService.findById(request.id);
    //     let response = new GetBlogResponseDto();
    //     response.title = blog.title;
    //     response.content = blog.content;
    //     response.image = blog.image;
    //     response.author = blog.id;

    //     return response;
    // }

    // @UsePipes(new ValidationPipe())
    // @Get("getAllUserBlog")
    // async getAllUserBlog(
    //     @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    // ): Promise<GetBlogResponseDto[]> {

    //     this.logger.debug('started getAllUserBlog()', BlogController.name);

    //     let blogs = await this.blogService.find({ author: authenticatedUser.id, state: BlogState.ACTIVE });

    //     let response = new Array<GetBlogResponseDto>();

    //     for (let i = 0; i < blogs.length; i++) {
    //         let blog = new GetBlogResponseDto();

    //         blog.title = blog.title;
    //         blog.content = blog.content;
    //         blog.image = blog.image;
    //         blog.author = blog.id;
    //     }
    //     return response;
    // }

    // @UsePipes(new ValidationPipe())
    // @Get("getAllBlog")
    // async getAllBlog(): Promise<GetBlogResponseDto[]> {

    //     this.logger.debug('started getAllBlog()', BlogController.name);

    //     let blogs = await this.blogService.find({ state: BlogState.ACTIVE });
    //     let response = new Array<GetBlogResponseDto>();

    //     for (let i = 0; i < blogs.length; i++) {
    //         let blog = new GetBlogResponseDto();

    //         blog.title = blog.title;
    //         blog.content = blog.content;
    //         blog.image = blog.image;
    //         blog.author = blog.id;
    //     }
    //     return response;
    // }

    // @UsePipes(new ValidationPipe())
    // @Post("deleteBlog")
    // async deleteBlog(
    //     @Body() request: GetBlogRequestDto,
    //     @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    // ): Promise<any> {

    //     this.logger.debug('started updateBlog()', BlogController.name);
    //     let blog = await this.blogService.findById(request.id);

    //     if (blog.author != authenticatedUser.id) {
    //         this.logger.error("You are not authorized.");
    //         throw ApiException.buildFromApiError(ApiError.NOT_AUTHORIZED);
    //     }

    //     blog.state = BlogState.PASSIVE;

    //     await this.blogService.update(blog);

    // }

}
