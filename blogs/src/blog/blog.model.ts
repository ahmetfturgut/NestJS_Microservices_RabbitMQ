import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { BaseModel, createSchema } from "../_common/model/base.model";
import { BlogState } from "./enum/blog.state";
import { Tag } from '../tag/tag.model';
import { Category } from '../category/category.model';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog extends BaseModel {

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    image: string;

    @Prop({ required: true, type: MongooseTypes.ObjectId, ref: 'Category' })
    categories: Category["id"][];

    @Prop({ required: true, type: MongooseTypes.ObjectId, ref: 'Tag' })
    tags: Tag["id"][];

    @Prop({
        enum: [BlogState],
        default: BlogState.PASSIVE
    })
    state: BlogState;

}

export const BlogSchema = createSchema(Blog);


