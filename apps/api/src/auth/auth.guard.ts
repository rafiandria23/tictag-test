import _ from 'lodash';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRequest } from './auth.interface';
import { AuthMetadataKey } from './auth.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      AuthMetadataKey.Public,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const accessToken = this.extractAccessToken(request);
    const payload = await this.authenticate(accessToken);

    _.set(request, 'user', payload);

    return true;
  }

  private extractAccessToken(request: AuthRequest) {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is not found!');
    }

    const [type, accessToken] = authorizationHeader.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Access token type is invalid!');
    }

    if (!accessToken) {
      throw new UnauthorizedException('Access token is not found!');
    }

    return accessToken;
  }

  private async authenticate(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken);

      return payload;
    } catch (err) {
      throw new UnauthorizedException('You are not authorized!');
    }
  }
}
