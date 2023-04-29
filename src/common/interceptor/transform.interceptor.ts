import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from '../dto/response.dto';



@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data = {}) => {
        const { message, status } = data;
        return {
          status: status ?? 'success',
          data: Object.keys(data).length !== 0 ? data : null,
          message: message ?? null,
        };
      }),
    );
  }
}
