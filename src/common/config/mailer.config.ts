import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const mailerConfig = async (configService: ConfigService): Promise<MailerOptions> => {
  return {
    transport: {
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: configService.get('MAIL_USERNAME'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    },
    defaults: {
      from: `"CVP Admin" <${configService.get('MAIL_FROM')}>`,
    },
  };
};