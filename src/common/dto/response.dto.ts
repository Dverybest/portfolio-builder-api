import { ApiProperty } from '@nestjs/swagger';

export class Response<T> {
  @ApiProperty()
  status: string;

  data: T;

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
