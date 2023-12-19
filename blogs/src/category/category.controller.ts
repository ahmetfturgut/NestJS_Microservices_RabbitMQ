import { Controller, Get, Post, Body, UsePipes, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateCategoryRequestDto } from './dto/category.request.dto';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { MessagePattern } from '@nestjs/microservices';

export class CategoryController {
    constructor(
        private readonly commentService: CategoryService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
    }


    @MessagePattern("createCategory")
    async createCategory(
        @Body() request: CreateCategoryRequestDto
    ): Promise<any> {

        this.logger.debug('started createCategory()', CategoryController.name);

        let category = new Category();
        category.name = request.name;
        category.description = request.description;

        await this.commentService.save(category)

        //Email atılacak
    }

}
