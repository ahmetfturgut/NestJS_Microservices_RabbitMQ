import { Controller, Get, Post, Body, UsePipes, Inject, ValidationPipe, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiTags } from '@nestjs/swagger';
import { CreateBlogRequestDto, DeleteBlogRequestDto, GetBlogRequestDto, UpdateBlogRequestDto } from './dto/blog.request.dto';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from 'src/core/guards/auth-guard';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { AuthenticatedUserDto } from 'src/auth/authenticated-user.dto';
import { CreateBlogResponseDto, GetBlogResponseDto, UpdateBlogResponseDto } from './dto/blog.response.dto';

@Controller('blogs')
@ApiTags('blogs')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
    }

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
        blog.categories = request.categories;
        blog.tags = request.tags;

        return await this.blogService.createBlog(blog, authenticatedUser);

    }

    @Post("updateBlog")
    async updateBlog(
        @Body() request: UpdateBlogRequestDto,
        @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    ): Promise<any> {

        this.logger.debug('started updateBlog()', BlogController.name);

        let blog = new UpdateBlogResponseDto();
        blog.title = request.title;
        blog.content = request.content;
        blog.image = request.image;
        blog.id = request.id;

        return await this.blogService.updateBlog(blog, authenticatedUser);

    }

    @Post("getBlog")
    async getBlog(
        @Body() request: GetBlogRequestDto,
        @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    ): Promise<any> {

        this.logger.debug('started getBlog()', BlogController.name);

        let blog = new GetBlogResponseDto();
        blog.id = request.id;

        return await this.blogService.getBlog(blog, authenticatedUser);
    }

    @Get("getAllBlogByUserId")
    async getAllBlogByUserId(
        @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    ): Promise<any> {

        this.logger.debug('started getAllBlogByUserId()', BlogController.name);

        return await this.blogService.getAllBlogByUserId(authenticatedUser);
    }

    @Get("getAllBlog")
    async getAllBlog(): Promise<any> {

        this.logger.debug('started getAllBlog()', BlogController.name);

        return await this.blogService.getAllBlog();
    }

    @Post("deleteBlog")
    async deleteBlog(
        @Body() request: DeleteBlogRequestDto,
        @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto
    ): Promise<any> {

        this.logger.debug('started updateBlog()', BlogController.name);

        let blog = new DeleteBlogRequestDto();
        blog.id = request.id;
        return await this.blogService.deleteBlog(blog, authenticatedUser);

    }

}
