import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { BaseModel, createSchema } from "../_common/model/base.model";
import { CategoryState } from './enum/category.state';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends BaseModel {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string; 

    @Prop({
        enum: [CategoryState],
        default: CategoryState.PASSIVE
    })
    state: CategoryState;

}

export const CategorySchema = createSchema(Category);


