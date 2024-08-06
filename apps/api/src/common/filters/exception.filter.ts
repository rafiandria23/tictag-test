import _ from 'lodash';
import { HttpAdapterHost } from '@nestjs/core';
import {
  Logger,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { isString } from 'tipe-apa';

import { CommonService } from '../common.service';

@Catch()
export class ExceptionFilter
  implements NestExceptionFilter<HttpException | Error>
{
  constructor(
    private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly commonService: CommonService,
  ) {}

  public catch(exception: HttpException | Error, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const context = host.switchToHttp();

    let errStatus: HttpStatus = _.defaultTo(
      _.get(exception, 'status'),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    let errData: string | object = _.defaultTo(
      _.get(exception, 'data'),
      'Oops! Something unexpected occurred.',
    );

    if (exception instanceof HttpException) {
      errStatus = exception.getStatus();
      errData = _.get(
        _.omit(exception.getResponse() as object, ['statusCode', 'error']),
        'message',
      );
    } else {
      this.logger.error(exception.message, exception.stack, exception.name);
    }

    if (isString(errData)) {
      errData = {
        message: errData,
      };
    }

    return httpAdapter.reply(
      context.getResponse(),
      this.commonService.successTimestamp({
        success: false,
        data: errData,
      }),
      errStatus,
    );
  }
}
