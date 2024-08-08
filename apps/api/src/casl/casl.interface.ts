import { InferSubjects, PureAbility } from '@casl/ability';

import { Product } from '../product/schemas/product.schema';
import { WarrantyClaim } from '../product/schemas/warranty-claim.schema';

import { Action } from './casl.constant';

export type Subject =
  | InferSubjects<typeof Product | typeof WarrantyClaim>
  | 'all';

export type AppAbility = PureAbility<[Action, Subject]>;

interface PolicyHandlerFunction {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = PolicyHandlerFunction | PolicyHandlerCallback;
