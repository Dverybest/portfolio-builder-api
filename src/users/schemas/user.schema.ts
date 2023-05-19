import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Model } from 'mongoose';
import { hashPassword } from 'src/utils';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (_, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  fullName: string;

  @ApiProperty()
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty()
  @Prop({ type: String })
  password: string;

  @ApiProperty()
  @Prop({ type: String, default: null })
  picture: string;

  @ApiProperty()
  @Prop({ type: Boolean, default: false })
  isGoogleSignIn: boolean;

  @ApiProperty()
  @Prop({ type: Boolean, default: false })
  isLinkedInSignIn: boolean;

  @ApiProperty({type:Boolean})
  @Prop({ type: Boolean, default: false })
  hasVerifiedEmail: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<User>;

UserSchema.pre('save', function (next) {
  if (this.password) {
    this.password = hashPassword(this.password);
  }
  next();
});
