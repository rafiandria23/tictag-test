import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserPasswordDocument = HydratedDocument<UserPassword>;

@Schema({
  collection: 'user_passwords',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class UserPassword {
  @Prop({
    required: true,
  })
  hash: string;
}

export const UserPasswordSchema = SchemaFactory.createForClass(UserPassword);
