import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyFunction,
} from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('linkedin.clientId'),
      clientSecret: configService.get('linkedin.clientSecret'),
      callbackURL: `${configService.get('url')}/api/v1/auth/linkedin/callback`,
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  validate: VerifyFunction = async (
    _accessToken,
    _refreshToken,
    profile,
    done,
  ) => {
    const user = {
      email: profile.emails[0].value,
      fullName: `${profile.name.givenName} ${profile.name.familyName}`,
      picture: profile.photos[0].value,
    };
    return done(null, user);
  };
}
