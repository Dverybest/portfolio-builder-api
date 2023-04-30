import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtGuard } from '../guard/auth.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDTO } from '../dto/response.dto';

export function Auth() {
  return applyDecorators(
    UseGuards(JwtGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: ErrorResponseDTO,
    }),
  );
}
