import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoffeeDocument = Document & Coffee;

@Schema()
export class Coffee {
  @Prop()
  cup_id: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  cold: string;

  @Prop({ required: true })
  ice: boolean;

  @Prop([String])
  args: string[];

  @Prop({ required: true })
  price: number;
}

export const coffeeSchema = SchemaFactory.createForClass(Coffee);
