import { ApiProperty } from '@nestjs/swagger';
import { Dayjs } from 'dayjs';

export class SuccessTimestampDto<MD = undefined, D = undefined> {
  @ApiProperty({
    required: true,
  })
  public readonly success: boolean;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: true,
  })
  public readonly timestamp: Dayjs;

  @ApiProperty()
  public readonly metadata: MD = undefined;

  @ApiProperty()
  public readonly data: D = undefined;
}
