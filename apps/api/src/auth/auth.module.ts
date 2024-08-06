import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';

import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';

import {
  UserPassword,
  UserPasswordSchema,
} from './schemas/user-password.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: UserPassword.name,
        useFactory: () => {
          const schema = UserPasswordSchema;

          schema.pre('save', async function () {
            if (this.hash) {
              this.hash = await bcrypt.hash(this.hash, 10);
            }
          });

          return schema;
        },
      },
    ]),
    CommonModule,
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
