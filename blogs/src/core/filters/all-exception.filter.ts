import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { ApiException } from 'src/_common/api/api.exeptions';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let apiErrorCode;
    let data;
 
    if (exception instanceof ApiException) {
      // ApiException hatasını işle
      httpStatus = exception.getStatus();
      message = exception.message;
      apiErrorCode = exception.getApiErrorCode();
      data = exception.getData();
    } else if (exception instanceof RpcException) {
      // RpcException hatasını işle
      httpStatus = HttpStatus.BAD_REQUEST; // Veya uygun bir durum kodu
      message = exception.getError() as string;
    } else if (exception instanceof HttpException) {
      // HttpException hatasını işle
      httpStatus = exception.getStatus();
      message = exception.message;
    }

    const responseBody = {
      httpStatus,
      message,
      apiErrorCode,
      data,
      timestamp: new Date().toISOString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}