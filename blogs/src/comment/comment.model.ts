import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { BaseModel, createSchema } from "../_common/model/base.model";
import { CommentState } from "./enum/comment.state";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends BaseModel {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    image: string;

    @Prop({
        enum: [CommentState],
        default: CommentState.PASSIVE
    })
    state: CommentState;

}

export const CommentSchema = createSchema(Comment);


