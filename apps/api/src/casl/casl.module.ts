import { Module } from '@nestjs/common';

import { AbilityFactory } from './factories/ability.factory';

@Module({
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class CaslModule {}
