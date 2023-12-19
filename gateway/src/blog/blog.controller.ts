import { Controller, Get, Post, Body, UsePipes, Inject, ValidationPipe,UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Public } from '../core/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateBlogRequestDto  } from './dto/blog.request.dto';
import { BlogService } from './blog.service'; 
import { JwtAuthGuard } from 'src/core/guards/auth-guard';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { AuthenticatedUserDto } from 'src/auth/authenticated-user.dto';
import { CreateBlogResponseDto } from './dto/blog.response.dto';

@Controller('blogs')
@ApiTags('blogs')
export class BlogController {
    constructor(
        private readonly blogService: BlogService, 
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post("createBlog")
    async createBlog(
        @Body() request: CreateBlogRequestDto,
        @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    ): Promise<any> {

        this.logger.debug('started createBlog()', BlogController.name);

        let blog = new CreateBlogResponseDto();
        blog.title = request.title;
        blog.content = request.content;
        blog.image = request.image;
        blog.id = authenticatedUser._id;
        blog.categories = request.categories;
        blog.tags = request.tags;

        console.log(blog)
       return await this.blogService.createBlog(blog);

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
