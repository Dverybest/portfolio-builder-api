import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class VerificationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ path: string; user: User }>();
    const { user, path } = request;
    if (
      !user.hasVerifiedEmail &&
      !(
        path.includes('/auth/verify-token') ||
        path.includes('/auth/resend-verification-token')
      )
    ) {
      throw new ForbiddenException('Email verification is required');
    }
    return true;
  }
}
