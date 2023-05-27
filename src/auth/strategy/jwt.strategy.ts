import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import {
  ForbiddenException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret'),
    });
  }
  async validate(payload: { email: string }) {
    const user = await this.authService.validatUser(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
