import _ from 'lodash';
import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { AuthUser, AuthRequest } from './auth.interface';
import { AuthMetadataKey } from './auth.constant';

export const Public = () => SetMetadata(AuthMetadataKey.Public, true);

export const Auth = createParamDecorator<unknown, ExecutionContext, AuthUser>(
  (__, context) => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return _.get(request, 'user');
  },
);
