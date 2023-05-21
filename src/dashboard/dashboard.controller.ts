import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { UserDTO } from './dto/dasboard.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly usersService: UsersService) {}

  @Auth()
  @Get('/profile')
  @ApiOperation({ summary: 'user profile' })
  @ApiOkResponse({
    type: UserDTO,
  })
  @HttpCode(HttpStatus.OK)
  userProfile(@CurrentUser() user: User) {
    return user ;
  }
}
