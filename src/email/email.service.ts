import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { welcomeEmail } from './templates/welcome.email';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { generateRandomNumber } from 'src/utils';
import { verifyAccountMail } from './templates/verify-account.email';
import { EXPIRE_IN_ONE_HOUR } from 'src/utils/constant';

@Injectable()
export class EmailService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendWelcomeMail(email: string, username: string) {
    const res = await this.mailerService.sendMail({
      to: email,
      subject: 'Sign up successful',
      html: welcomeEmail({
        username,
        appUrl: this.configService.get('frontendUrl'),
      }),
    });
    return res;
  }

  async sendVerifyAccountMail(email: string, username: string) {
    const token = generateRandomNumber();
    await this.cacheManager.set(email, token, EXPIRE_IN_ONE_HOUR);
    const res = await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your account',
      html: verifyAccountMail(username, token),
    });
    return res;
  }
}
