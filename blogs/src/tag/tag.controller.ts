import { Controller, Get, Post, Body, UsePipes, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateTagRequestDto } from './dto/tag.request.dto';
import { TagService } from './tag.service';
import { Tag } from './tag.model';
import { MessagePattern } from '@nestjs/microservices';

export class TagController {
    constructor(
        private readonly tagService: TagService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
    }

    @MessagePattern("createTag")
    async createTag(
        @Body() request: CreateTagRequestDto
    ): Promise<any> {

        this.logger.debug('started createTag()', TagController.name);

        let tag = new Tag();
        tag.name = request.name;
        tag.description = request.description;

        await this.tagService.save(tag)

        //Email atılacak
    }



}
