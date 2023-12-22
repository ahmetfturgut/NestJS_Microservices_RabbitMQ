import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Repository } from '../_common/repository/repository';
import { Tag, TagDocument } from './tag.model';

@Injectable()
export class TagRepository extends Repository<Tag, TagDocument>{

    constructor(@InjectModel(Tag.name) protected readonly mongoModel: Model<TagDocument>) {
        super(mongoModel);
    }

    public async getTagsByIds(ids: Tag["id"][]): Promise<Tag[]> {
        return await this.mongoModel.find({
            _id: { $in: ids },
        })
            .exec()
    }

}