import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { comparePassword } from 'src/utils';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validatUser(email: string) {
    const user = await this.usersService.findOne({ email });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const exitingUser = await this.usersService.findOne({
      email: createUserDto.email,
    });
    if (exitingUser) {
      throw new BadRequestException('User already exits');
    }

    const user = await this.usersService.create(createUserDto);

    const access_token = this.jwtService.sign({
      email: user.email,
      id: user._id,
    });
    const { password, ...rest } = user.toJSON();

    return { ...rest, access_token };
  }

  async verifyToken(email: string, token: string) {
    const value = await this.cacheManager.get(email);
    if (value !== token) {
      throw new BadRequestException('Invalid token');
    }
    const user = this.usersService.update(
      { email },
      { hasVerifiedEmail: true },
    );
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid email and password');
    }

    const isPasswordMatch = comparePassword(loginDto.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email and password');
    }

    const access_token = this.jwtService.sign({
      email: user.email,
      id: user._id,
    });
    const { password, ...rest } = user.toJSON();
    return { ...rest, access_token };
  }

  async googleSignIn({
    fullName,
    email,
    picture,
  }: {
    fullName: string;
    email: string;
    picture?: string;
  }) {
    let user = await this.usersService.findOne({ email });
    let isNewUser = false;
    if (!user) {
      user = await this.usersService.create({
        email,
        fullName,
        picture,
        isGoogleSignIn: true,
        hasVerifiedEmail: true,
      });
      isNewUser = true;
    }

    const access_token = this.jwtService.sign({
      email: user.email,
      id: user._id,
    });

    return { ...user, access_token, isNewUser };
  }
}
