import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CoachDocument = Coach & Document;

@Schema()
export class Coach {
  @Prop()
  name: string;

}

export const CoachSchema = SchemaFactory.createForClass(Coach);