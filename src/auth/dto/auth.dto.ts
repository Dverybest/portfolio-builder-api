import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Response } from 'src/common/dto/response.dto';
import { User } from 'src/users/schemas/user.schema';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class AuthResponseDto extends Response<User> {
  @ApiProperty()
  data: User;
}
