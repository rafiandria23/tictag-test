import _ from 'lodash';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  UserPassword,
  UserPasswordDocument,
} from '../../auth/schemas/user-password.schema';

import { UserRole } from '../user.constant';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User {
  @Prop({
    required: true,
  })
  first_name: string;

  @Prop({
    required: false,
    default: true,
  })
  last_name?: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    enum: _.values(UserRole),
  })
  role: UserRole;

  @Prop({
    type: Types.ObjectId,
    ref: UserPassword.name,
    required: true,
    unique: true,
  })
  password: UserPasswordDocument;
}

export const UserSchema = SchemaFactory.createForClass(User);
