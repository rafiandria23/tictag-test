import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public create(payload: CreateUserDto, password: Types.ObjectId) {
    return this.userModel.create({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      role: payload.role,
      password,
    });
  }

  public readById(_id: string) {
    return this.userModel.findById(_id);
  }

  public readByEmail(email: string) {
    return this.userModel.findOne({
      email,
    });
  }
}
