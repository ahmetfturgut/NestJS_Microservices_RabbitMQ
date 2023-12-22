import { Controller, Get, Body, UsePipes, Inject } from '@nestjs/common';
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
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { AuthenticatedUserDto } from 'src/auth/dto/authenticated-user.dto';
import { MessagePattern } from '@nestjs/microservices';


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
        data: { blogDto: CreateBlogRequestDto; authenticatedUser: AuthenticatedUserDto },
    ): Promise<any> {

        this.logger.debug('started createBlog()', BlogController.name);

        const { blogDto, authenticatedUser } = data;

        let blog = new Blog();
        blog.title = blogDto.title;
        blog.author = authenticatedUser.id;
        blog.content = blogDto.content;
        blog.image = blogDto.image;
        blog.categories = [];
        blog.tags = [];

        //check category
        for (let i = 0; i < blogDto.categories.length; i++) {
            let category = await this.categoryService.findById(blogDto.categories[i]);
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
        for (let i = 0; i < blogDto.tags.length; i++) {
            let tag = await this.tagService.findById(blogDto.tags[i]);
            if (tag.state == TagState.ACTIVE) {
                blog.tags.push(tag.id);
            }
        }

        if (blog.tags.length == 0) {
            this.logger.error('not found tag ');
            throw ApiException.buildFromApiError(ApiError.REQUIRED_TAG);
        }
        //check tag 

        return await this.blogService.save(blog);

        //Email atılacak 

    }

    @MessagePattern("updateBlog")
    async updateBlog(
        data: { blogDto: UpdateBlogRequestDto; authenticatedUser: AuthenticatedUserDto },
    ): Promise<any> {

        this.logger.debug('started updateBlog()', BlogController.name);
        const { blogDto: blogDto, authenticatedUser } = data;
        let blog = await this.blogService.findById(blogDto.id);

        if (blog.author == authenticatedUser.id) {
            this.logger.error("You are not authorized.");
            throw ApiException.buildFromApiError(ApiError.NOT_AUTHORIZED);
        }

        blog.title = blogDto.title;
        blog.content = blogDto.content;
        blog.image = blogDto.image;
        blog.author = authenticatedUser.id;

        return await this.blogService.update(blog);

    }

    @MessagePattern("deleteBlog")
    async deleteBlog(
        data: { blogDto: UpdateBlogRequestDto; authenticatedUser: AuthenticatedUserDto }
    ): Promise<any> {

        this.logger.debug('started updateBlog()', BlogController.name);
        const { blogDto, authenticatedUser } = data;
        let blog = await this.blogService.findById(blogDto.id);

        if (blog.author != authenticatedUser.id) {
            this.logger.error("You are not authorized.");
            throw ApiException.buildFromApiError(ApiError.NOT_AUTHORIZED);
        }

        blog.state = BlogState.PASSIVE;

        return await this.blogService.update(blog);

    }

    @MessagePattern("getBlog")
    async getBlog(
        data: { blogDto: UpdateBlogRequestDto; authenticatedUser: AuthenticatedUserDto },
    ): Promise<GetBlogResponseDto> {

        this.logger.debug('started getBlog()', BlogController.name);
        const { blogDto, authenticatedUser } = data;

        let blog = await this.blogService.findById(blogDto.id);
        let response = new GetBlogResponseDto();
        response.title = blog.title;
        response.content = blog.content;
        response.image = blog.image;
        response.author = blog.id;
        response.categories = blog.categories;
        response.tags = blog.tags;

        return response;
    }

    @MessagePattern("getAllBlogByUserId")
    async getAllBlogByUserId(
        data: { authenticatedUser: AuthenticatedUserDto }
    ): Promise<GetBlogResponseDto[]> {

        this.logger.debug('started getAllBlogByUserId()', BlogController.name);
        const { authenticatedUser } = data;
        let blogs = await this.blogService.find({ author: authenticatedUser.id, state: BlogState.ACTIVE });

        let response = new Array<GetBlogResponseDto>();

        for (let i = 0; i < blogs.length; i++) {
            let blog = new GetBlogResponseDto();
            blog.title = blogs[i].title;
            blog.content = blogs[i].content;
            blog.image = blogs[i].image;
            blog.author = blogs[i].id;
            blog.categories = blogs[i].categories;
            blog.tags = blogs[i].tags;

            response.push(blog);
        }
        return response;
    }

    @MessagePattern("getAllBlog")
    async getAllBlog(): Promise<GetBlogResponseDto[]> {

        this.logger.debug('started getAllBlog()', BlogController.name);

        let blogs = await this.blogService.find({ state: BlogState.ACTIVE });
        let response = new Array<GetBlogResponseDto>();

        for (let i = 0; i < blogs.length; i++) {
            let blog = new GetBlogResponseDto();
            blog.title = blogs[i].title;
            blog.content = blogs[i].content;
            blog.image = blogs[i].image;
            blog.author = blogs[i].id;
            blog.categories = blogs[i].categories;
            blog.tags = blogs[i].tags;

            response.push(blog);
        }
        return response;
    }
 

}
