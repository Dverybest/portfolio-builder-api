import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Model } from 'mongoose';
import { type } from 'os';

@Schema()
export class User {
  _id: string;
  
  @ApiProperty()
  @Prop()
  fullName: string;

  @ApiProperty()
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<User>;
