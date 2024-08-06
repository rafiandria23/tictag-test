import { SetMetadata } from '@nestjs/common';

import { PolicyHandler } from './casl.interface';
import { CaslMetadataKey } from './casl.constant';

export const CheckPolicy = (...handlers: PolicyHandler[]) =>
  SetMetadata(CaslMetadataKey.CheckPolicy, handlers);
