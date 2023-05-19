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
import { AuthResponseDto, LoginDto, VerifyTokenDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { ResponseDTO } from 'src/common/dto/response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'user sign up' })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.create(createUserDto);
    await this.emailService.sendWelcomeMail(user.email, user.fullName);
    await this.emailService.sendVerifyAccountMail(user.email, user.fullName);
    return user;
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

  @ApiOperation({ summary: 'resend verification token' })
  @ApiOkResponse({
    type: ResponseDTO,
  })
  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('/resend-verification-token')
  async resendVerifiicationToken(@CurrentUser() user: User) {
    this.emailService.sendVerifyAccountMail(user.email, user.fullName);
    return null;
  }

  @ApiOperation({ summary: 'verify token' })
  @ApiOkResponse({
    type: ResponseDTO,
  })
  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('/verify-token')
  async verifiicationToken(@Body() body: VerifyTokenDTO,@CurrentUser() user: User) {
    return this.authService.verifyToken(user.email,body.token);
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
    if(user.isNewUser){
      await this.emailService.sendWelcomeMail(user.email, user.fullName);
    }
    return res.redirect(
      `${this.configService.get('frontendUrl')}?token=${user.access_token}`,
    );
  }
}
