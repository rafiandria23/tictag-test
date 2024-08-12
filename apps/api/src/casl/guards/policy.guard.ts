import _ from 'lodash';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { isFunction } from 'tipe-apa';

import { AuthRequest } from '../../auth/auth.interface';

import { PolicyHandler, AppAbility } from '../casl.interface';
import { CaslMetadataKey } from '../casl.constant';
import { AbilityFactory } from '../factories/ability.factory';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (isFunction(handler)) {
      return handler(ability);
    }

    return handler.handle(ability);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const policyHandlers = _.defaultTo(
      this.reflector.get<PolicyHandler[]>(
        CaslMetadataKey.CheckPolicy,
        context.getHandler(),
      ),
      [],
    );

    const { user } = context.switchToHttp().getRequest<AuthRequest>();
    const ability = this.abilityFactory.createForUser(user);

    if (
      policyHandlers.every((handler) =>
        this.execPolicyHandler(handler, ability),
      )
    ) {
      return true;
    }

    throw new ForbiddenException('You are not authorized!');
  }
}
