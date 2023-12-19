import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { BaseModel, createSchema } from "../_common/model/base.model";
import { TagState } from "./enum/tag.state";

export type TagDocument = Tag & Document;

@Schema()
export class Tag extends BaseModel {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string; 

    @Prop({
        enum: [TagState],
        default: TagState.PASSIVE
    })
    state: TagState;

}

export const TagSchema = createSchema(Tag);


