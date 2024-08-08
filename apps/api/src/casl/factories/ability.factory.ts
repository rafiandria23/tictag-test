import { Injectable } from '@nestjs/common';
import {
  PureAbility,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';

import { AuthUser } from '../../auth/auth.interface';
import { UserRole } from '../../user/user.constant';
import { Product } from '../../product/schemas/product.schema';
import { WarrantyClaim } from '../../product/schemas/warranty-claim.schema';

import { Subject, AppAbility } from '../casl.interface';
import { Action } from '../casl.constant';

@Injectable()
export class AbilityFactory {
  createForUser(user: AuthUser) {
    const { can, build } = new AbilityBuilder<PureAbility<[Action, Subject]>>(
      PureAbility as AbilityClass<AppAbility>,
    );

    switch (user.role) {
      case UserRole.Staff:
        can(
          [Action.Create, Action.Read, Action.Update, Action.Delete],
          Product,
        );
        can([Action.Read, Action.Update], WarrantyClaim);
        break;

      case UserRole.Customer:
      default:
        can([Action.Read], Product);
        can([Action.Create, Action.Read], WarrantyClaim);
        break;
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    });
  }
}
