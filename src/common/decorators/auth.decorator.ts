import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDTO } from '../dto/response.dto';
import { VerificationGuard } from '../guard/verification.guard';
import { AuthGuard } from '@nestjs/passport';

export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    UseGuards(VerificationGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: ErrorResponseDTO,
    }),
  );
}
