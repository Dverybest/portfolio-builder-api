import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseDTO } from '../dto/response.dto';



@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseDTO>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDTO> {
    return next.handle().pipe(
      map((data = {}) => {
        const { message, status ,...rest} = data;
        return {
          status: status ?? 'success',
          data: Object.keys(rest).length !== 0 ? {...rest} : null,
          message: message ?? null,
        };
      }),
    );
  }
}
