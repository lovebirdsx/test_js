import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const stacks = exception instanceof HttpException ? exception.stack.split('\n') : null;

    const json = {
      statusCode: status,
      message: exception instanceof HttpException ? exception.message : 'Internal Server Error',
      timestamp: new Date().toLocaleString(),
      path: request.url,
      stack: stacks,
    }

    response.status(status).json(json);
  }
}