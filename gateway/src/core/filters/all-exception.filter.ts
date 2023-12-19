import {
  Catch,
  ArgumentsHost,
  RpcExceptionFilter,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<RpcException> {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): Observable<any> {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    httpAdapter.reply(ctx.getResponse(), exception);
    return throwError(() => exception);
  }
}