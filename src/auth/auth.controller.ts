import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthResponseDto, LoginDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'user sign up' })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiOperation({ summary: 'user login' })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('google')
  @ApiOperation({
    summary: 'sign in with google',
    description:
      'call this endpoint from a browser for it to redirect to google server',
  })
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @ApiExcludeEndpoint()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const user = await this.authService.googleSignIn({
      email: req.user.email,
      fullName: req.user.fullName,
      picture: req.user.picture,
    });

    return res.redirect(
      `${this.configService.get('frontendUrl')}?token=${user.access_token}`,
    );
  }
}
