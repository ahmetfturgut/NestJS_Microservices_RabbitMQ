import { Type } from '@nestjs/common';
const mongooseLeanVirtuals= require ('mongoose-lean-virtuals'); 
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";  
@Schema()
export class HasId {
    id: string;
}

export class AuditModel {
    @Prop({ default: Date.now })
    createdDate: Date;

    @Prop({ default: Date.now })
    updatedDate: Date;

    @Prop()
    createdUserId: string;

    @Prop()
    updatedUserId: string;;
}

@Schema()
export class BaseModel extends HasId {

    @Prop()
    audit: AuditModel;
}

export function createSchema<TClass extends any = any>(target: Type<TClass>) {
    let schema = SchemaFactory.createForClass(target);

    schema.plugin(mongooseLeanVirtuals);
    schema.virtual('id').get(function () {
        return this._id.toString();
    });

    return schema;
}

 