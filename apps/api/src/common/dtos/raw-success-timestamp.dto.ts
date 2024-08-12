import { PickType } from '@nestjs/swagger';

import { SuccessTimestampDto } from './success-timestamp.dto';

export class RawSuccessTimestampDto extends PickType(SuccessTimestampDto, [
  'success',
  'timestamp',
] as const) {}
