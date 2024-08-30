import { BadRequestException, Injectable } from '@nestjs/common';
import { GravyBaseService } from './gravy.base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerAdmin, Worker, TenantAdmin } from '../../database/entities/mysql';
import { FindOptionsWhere, Repository } from 'typeorm';
import moment, { Moment } from 'moment';

@Injectable()
export class GeneralService extends GravyBaseService {
  constructor(
    @InjectRepository(Worker) private workerRepository: Repository<Worker>,
    @InjectRepository(CustomerAdmin) private customerAdminRepository: Repository<CustomerAdmin>,
    @InjectRepository(TenantAdmin) private tenantAdminRepository: Repository<TenantAdmin>,
  ) {
    super();
  }

  async updateWorkerProfileImage(id: number, thumbnailKey: string, originalFileKey: string): Promise<boolean> {
    return this.updateProfileImage(
      this.workerRepository,
      { id },
      { avatar_key: thumbnailKey, avatar_original_key: originalFileKey },
    );
  }

  async updateTenantAdminProfileImage(id: number, thumbnailKey: string, originalFileKey: string): Promise<boolean> {
    return this.updateProfileImage(
      this.tenantAdminRepository,
      { id },
      { avatar_key: thumbnailKey, avatar_original_key: originalFileKey },
    );
  }

  async updateCustomerAdminProfileImage(id: number, thumbnailKey: string, originalFileKey: string): Promise<boolean> {
    return this.updateProfileImage(
      this.customerAdminRepository,
      { id },
      { avatar_key: thumbnailKey, avatar_original_key: originalFileKey },
    );
  }

  handleShift = (shiftStart: Moment, shiftEnd: Moment, userStart: Moment, userEnd: Moment) => {
    const isOvernightShift = this.areDatesCrossingMidnight(shiftStart, shiftEnd);
    const isStartTimeGreater = this.isTimeGreaterThan(userStart, userEnd);

    const result = {
      duration: 0,
      checkin: moment(),
      checkout: moment(),
    };

    if (!isOvernightShift) {
      if (!isStartTimeGreater) {
        result.checkin = this.combineDateAndTime(shiftStart, userStart);
        result.checkout = this.combineDateAndTime(shiftEnd, userEnd);
      } else {
        result.checkin = this.combineDateAndTime(shiftStart, userStart);
        result.checkout = this.combineDateAndTime(shiftEnd.clone().add(1, 'days'), userEnd);
        if (result.checkin > shiftStart) {
          result.checkin = this.combineDateAndTime(shiftStart.clone().add(-1, 'days'), userStart);
          result.checkout = this.combineDateAndTime(shiftEnd, userEnd);
          // if after making changes to the checkin value above, the resultant checkin time is going behind beyond
          // 30 minutes then we don't need to change it
          if (result.checkin.diff(shiftStart, 'minutes') < -30) {
            result.checkin = this.combineDateAndTime(shiftStart, userStart);
            result.checkout = this.combineDateAndTime(shiftEnd.clone().add(1, 'days'), userEnd);
          }
        }
      }
    } else {
      if (!isStartTimeGreater) {
        if (userStart.isAfter(shiftStart, 'day')) {
          result.checkin = this.combineDateAndTime(shiftEnd, userStart);
          result.checkout = this.combineDateAndTime(shiftEnd, userEnd);
        } else {
          result.checkin = this.combineDateAndTime(shiftStart, userStart);
          result.checkout = this.combineDateAndTime(shiftStart, userEnd);
        }
      } else {
        result.checkin = this.combineDateAndTime(shiftStart, userStart);
        result.checkout = this.combineDateAndTime(shiftEnd, userEnd);
      }
    }

    result.duration = result.checkout.diff(result.checkin, 'minutes') / 60;
    result.checkin = result.checkin.utc();
    result.checkout = result.checkout.utc();

    if (result.checkin.isAfter(moment().utc())) {
      throw new BadRequestException('general.CHECKIN_TIME_INVALID');
    }
    if (result.checkout.isAfter(moment().utc())) {
      throw new BadRequestException('general.CHECKOUT_TIME_INVALID');
    }
    return result;
  };

  //Private Methonds
  private areDatesCrossingMidnight = (date1: Moment, date2: Moment) => {
    // Compare date components
    const crossingMidnightDate = date1.date() !== date2.date();

    // Compare time components
    const crossingMidnightTime = date1.format('HH:mm') > date2.format('HH:mm');

    // Check if crossing midnight and date is changed
    return crossingMidnightDate && crossingMidnightTime;
  };

  private isTimeGreaterThan = (moment1: Moment, moment2: Moment) => {
    const time1 = moment1.format('HH:mm');
    const time2 = moment2.format('HH:mm');
    return time1 > time2;
  };

  private combineDateAndTime = (momentDate: Moment, momentTime: Moment): Moment => {
    // Extract date components from the first instance
    const datePart = momentDate.format('YYYY-MM-DD');

    // Extract time components from the second instance
    const timePart = momentTime.format('HH:mm:ss');

    // Combine date and time to create a new instance
    const combinedInstance = moment.utc(`${datePart} ${timePart}`, 'YYYY-MM-DD HH:mm:ss');

    return combinedInstance;
  };

  private async updateProfileImage(
    repository: Repository<Worker | CustomerAdmin | TenantAdmin>,
    findOptions: FindOptionsWhere<Worker | CustomerAdmin | TenantAdmin>,
    data: { avatar_key: string; avatar_original_key: string },
  ): Promise<boolean> {
    const update = await repository.update(findOptions, data);

    return update.affected > 0;
  }

  // Methods for testing private methods
  _areDatesCrossingMidnight = (date1: Moment, date2: Moment) => {
    return this.areDatesCrossingMidnight(date1, date2);
  };

  _isTimeGreaterThan = (moment1: Moment, moment2: Moment) => {
    return this.isTimeGreaterThan(moment1, moment2);
  };

  _combineDateAndTime = (momentDate: Moment, momentTime: Moment): Moment => {
    return this.combineDateAndTime(momentDate, momentTime);
  };
}
