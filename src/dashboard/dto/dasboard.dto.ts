import { ApiProperty } from '@nestjs/swagger';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { User } from 'src/users/schemas/user.schema';

export class UserDTO extends ResponseDTO {
  @ApiProperty()
  data: User;
}
