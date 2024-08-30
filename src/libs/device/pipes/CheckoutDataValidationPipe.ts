import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import moment, { Moment } from 'moment';
import { CheckoutDTO } from 'src/modules/general/dtos/checkout.dto';

@Injectable()
export class CheckoutDataValidationPipe implements PipeTransform {
  async transform(value: Record<string, unknown>): Promise<CheckoutDTO> {
    return {
      ...value,
      shiftStart: this.toMoment(value.shiftStart),
      shiftEnd: this.toMoment(value.shiftEnd),
      userStart: this.toTimeString(`${value.userStart}`),
      userEnd: this.toTimeString(`${value.userEnd}`),
    };
  }

  private toMoment(value: unknown): Moment {
    if (!moment(value).isValid()) {
      throw new BadRequestException('general.INVALID_DATE_FORMAT');
    }

    return moment.utc(value);
  }

  private toTimeString(value: string): Moment {
    // Regular expression for HH:mm format
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    // Test the input string against the regular expression
    if (!timeRegex.test(value)) {
      throw new BadRequestException('From pipe');
    }
    return moment.utc(value, 'HH:mm');
  }
}
