import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Portfolify');
  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse() as {
        message: string[] | string;
      };

      return response.status(status).json({
        status: 'error',
        message: Array.isArray(errorResponse.message)
          ? errorResponse.message[0]
          : errorResponse.message,
        errors: Array.isArray(errorResponse.message)
          ? errorResponse.message
          : undefined,
      });
    }
    if (exception instanceof mongoose.Error.ValidationError) {
      const errorMessages: string[] = Object.values(exception.errors).map(
        (e) => e.message,
      );
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: errorMessages[0],
        errors: errorMessages,
      });
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Something went wrong. Please try again later',
    });
  }
}
