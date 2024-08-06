import { InferSubjects, PureAbility } from '@casl/ability';

import { Product } from '../product/schemas/product.schema';
import { ProductWarrantyClaim } from '../product/schemas/product-warranty-claim.schema';

import { Action } from './casl.constant';

export type Subject =
  | InferSubjects<typeof Product | typeof ProductWarrantyClaim>
  | 'all';

export type AppAbility = PureAbility<[Action, Subject]>;

interface PolicyHandlerFunction {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = PolicyHandlerFunction | PolicyHandlerCallback;
