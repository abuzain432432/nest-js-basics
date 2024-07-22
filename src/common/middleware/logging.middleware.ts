import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/modules/logging/logging.service';

@Injectable()
/** NOTE
 * - The class should implement the NestMiddleware interface,
 * - while the function does not have any special requirements
 **/
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const message = `Incoming request: ${method} ${originalUrl}`;
    this.loggingService.verbose(
      '###################  ***************** ###################',
    );
    this.loggingService.log(message);
    this.loggingService.verbose(
      '###################  ***************** ###################',
    );
    next();
  }
}
