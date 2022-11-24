import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comments } from '../dto/comment.dto';

export type HotelDocument = Document & Hotel;

@Schema()
export class Hotel {
  @Prop()
  cup_id: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  desc: string;

  @Prop([String])
  roomDetail: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ type: Comments })
  comments: Comments;
}

export const hotelSchema = SchemaFactory.createForClass(Hotel);
