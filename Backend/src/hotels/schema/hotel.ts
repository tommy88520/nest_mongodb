import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  // @Prop({ type: Comments })
  // comments: Comments;
  @Prop({ required: true })
  comments: string;

  @Prop({ required: true })
  appraise: number;
}

export const hotelSchema = SchemaFactory.createForClass(Hotel);
