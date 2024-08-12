import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

export class ValidationErrorDto implements ValidationError {
  @ApiProperty({
    required: true,
  })
  public readonly property: string;

  @ApiProperty({
    type: () => ValidationErrorDto,
    isArray: true,
    required: true,
  })
  public readonly children: ValidationErrorDto[];

  @ApiProperty({
    required: true,
  })
  public readonly constraints: Record<string, string>;
}
