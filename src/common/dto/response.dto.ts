import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;
}

export class ErrorResponseDTO {
  @ApiProperty()
  status: string;

  @ApiProperty()
  error: string;

  @ApiProperty({ type: String, isArray: true })
  errors: string[];
}
