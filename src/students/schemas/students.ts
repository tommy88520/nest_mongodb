import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentsDocument = Students & Document;
@Schema()
export class Students {
  @Prop()
  stu_id: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop([String])
  likes: string[];
}
export const StudentSchema = SchemaFactory.createForClass(Students);
