import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Repository } from '../_common/repository/repository';
import { Category, CategoryDocument } from './category.model';

@Injectable()
export class CategoryRepository extends Repository<Category, CategoryDocument>{

    constructor(@InjectModel(Category.name) protected readonly mongoModel: Model<CategoryDocument>) {
        super(mongoModel);
    }

    public async getCategoriesByIds(ids: Category["id"][]): Promise<Category[]> {
        return await this.mongoModel.find({
            _id: { $in: ids },
        })
            .exec()
    } 

}