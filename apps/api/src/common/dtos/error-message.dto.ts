import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessageDto {
  @ApiProperty({
    required: true,
  })
  public readonly message: string;
}
