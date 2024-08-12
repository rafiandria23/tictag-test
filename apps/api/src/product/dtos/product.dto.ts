import { ApiProperty } from '@nestjs/swagger';
import { Dayjs } from 'dayjs';

export class ProductDto {
  @ApiProperty({
    required: true,
  })
  public readonly _id: string;

  @ApiProperty({
    required: true,
  })
  public readonly name: string;

  @ApiProperty({
    required: true,
  })
  public readonly description: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: true,
  })
  public readonly created_at: Dayjs | Date | string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: true,
  })
  public readonly updated_at: Dayjs | Date | string;
}
