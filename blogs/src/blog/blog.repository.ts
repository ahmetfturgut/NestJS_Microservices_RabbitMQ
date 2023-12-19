import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"; 
import { Repository } from '../_common/repository/repository';
import { Blog, BlogDocument } from './blog.model';

@Injectable()
export class BlogRepository extends Repository<Blog, BlogDocument>{

    constructor(@InjectModel(Blog.name) protected readonly mongoModel: Model<BlogDocument>) {
        super(mongoModel);
    }

   

}