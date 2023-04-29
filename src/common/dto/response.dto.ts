import { ApiProperty } from '@nestjs/swagger';

export class Response<T> {
  @ApiProperty()
  status: string;

  data: T;

  @ApiProperty()
  message: string;
}
