import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Response } from 'src/common/dto/response.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly usersService: UsersService) {}

  @Auth()
  @Get('/profile')
  @ApiOperation({summary:'user profile'})
  @ApiOkResponse({
    type: Response<User>,
  })
  @HttpCode(HttpStatus.OK)
  userProfile(@CurrentUser() user: User) {
    return this.usersService.findOne({ _id: user._id }).select(['-password']);
  }
}
