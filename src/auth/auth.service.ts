import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { comparePassword } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOne({ email: loginDto.email });
    if (!user) {
      throw new BadRequestException();
    }
    const isPasswordMatch = comparePassword(loginDto.password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException();
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

    if (!user) {
      user = await this.usersService.create({
        email,
        fullName,
        picture,
        isGoogleSignIn: true,
      });
    }

    const access_token = this.jwtService.sign({
      email: user.email,
      id: user._id,
    });

    return { ...user, access_token };
  }
}
