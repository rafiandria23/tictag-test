import { APP_PIPE, APP_GUARD, APP_FILTER } from '@nestjs/core';
import {
  Logger,
  Module,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import apiConfig from './configs/api.config';
import dbConfig from './configs/db.config';
import jwtConfig from './configs/jwt.config';

import { ExceptionFilter } from '../common/filters/exception.filter';
import { CommonModule } from '../common/common.module';
import { CaslModule } from '../casl/casl.module';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, dbConfig, jwtConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('db.uri'),
        user: configService.get<string>('db.user'),
        pass: configService.get<string>('db.pass'),
        dbName: configService.get<string>('db.name'),
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          issuer: 'Tictag',
        },
      }),
    }),
    CommonModule,
    CaslModule,
    AuthModule,
    UserModule,
    ProductModule,
    DashboardModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory(data) {
            return new BadRequestException(data);
          },
          validationError: {
            target: false,
            value: false,
          },
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
