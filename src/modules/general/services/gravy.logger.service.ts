/* eslint-disable */

import { ConsoleLogger } from '@nestjs/common';

export class GravyLogger extends ConsoleLogger {
  error(message: string, ...optionalParams: [...any, string?, string?]) {
    super.error(message, this.formatParams(optionalParams));
  }

  log(message: string, ...optionalParams: [...any, string?, string?]) {
    super.log(message, this.formatParams(optionalParams));
  }

  debug(message: string, ...optionalParams: [...any, string?, string?]) {
    super.debug(message, this.formatParams(optionalParams));
  }

  warn(message: string, ...optionalParams: [...any, string?, string?]) {
    super.warn(message, this.formatParams(optionalParams));
  }

  verbose(message: string, ...optionalParams: [...any, string?, string?]) {
    super.verbose(message, this.formatParams(optionalParams));
  }

  private formatParams(params: [...any, string?, string?]) {
    if (process.env.APP_ENV === 'local') {
      return typeof params === 'string' || params instanceof String ? params : JSON.stringify(params, null, 2);
    }
    return typeof params === 'string' || params instanceof String ? params : JSON.stringify(params);
  }
}
