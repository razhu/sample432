import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { GeneralService } from './general.service';
import { Worker, CustomerAdmin, TenantAdmin } from '../../database/entities/mysql';
import { getRepositoryToken } from '@nestjs/typeorm';
import moment from 'moment';

describe('GeneralService', () => {
  let service: GeneralService;
  let workerRepository: Repository<Worker>;
  let customerAdminRepository: Repository<CustomerAdmin>;
  let tenantAdminRepository: Repository<TenantAdmin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneralService,
        {
          provide: getRepositoryToken(Worker),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CustomerAdmin),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TenantAdmin),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GeneralService>(GeneralService);
    workerRepository = module.get(getRepositoryToken(Worker));
    customerAdminRepository = module.get(getRepositoryToken(CustomerAdmin));
    tenantAdminRepository = module.get(getRepositoryToken(TenantAdmin));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateWorkerProfileImage', () => {
    it('should update worker profile image', async () => {
      const updateSpy = jest
        .spyOn(workerRepository, 'update')
        .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
      const result = await service.updateWorkerProfileImage(1, 'thumbnailKey', 'originalFileKey');

      expect(updateSpy).toHaveBeenCalledWith(
        { id: 1 },
        { avatar_key: 'thumbnailKey', avatar_original_key: 'originalFileKey' },
      );
      expect(result).toBe(true);
    });
  });

  describe('updateTenantAdminProfileImage', () => {
    it('should update tenant admin profile image', async () => {
      const updateSpy = jest
        .spyOn(tenantAdminRepository, 'update')
        .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
      const result = await service.updateTenantAdminProfileImage(1, 'thumbnailKey', 'originalFileKey');

      expect(updateSpy).toHaveBeenCalledWith(
        { id: 1 },
        { avatar_key: 'thumbnailKey', avatar_original_key: 'originalFileKey' },
      );
      expect(result).toBe(true);
    });
  });

  describe('updateCustomerAdminProfileImage', () => {
    it('should update customer admin profile image', async () => {
      const updateSpy = jest
        .spyOn(customerAdminRepository, 'update')
        .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
      const result = await service.updateCustomerAdminProfileImage(1, 'thumbnailKey', 'originalFileKey');

      expect(updateSpy).toHaveBeenCalledWith(
        { id: 1 },
        { avatar_key: 'thumbnailKey', avatar_original_key: 'originalFileKey' },
      );
      expect(result).toBe(true);
    });
  });

  describe('handleShift', () => {
    it('should throw error if the time passes the current time', () => {
      // Arrange
      const shiftStart = moment.utc().set({ hour: 8 });
      const shiftEnd = moment.utc().set({ hour: 17 });
      const userStart = moment.utc().set({ hour: 9 });
      const userEnd = moment.utc().add(1, 'minute');

      // Act & Assert
      expect(() => service.handleShift(shiftStart, shiftEnd, userStart, userEnd)).toThrowError(
        /general\.CHECKIN_TIME_INVALID|general\.CHECKOUT_TIME_INVALID/,
      );
    });

    it('should handle non-overnight shift with start time not greater', () => {
      // Arrange
      const shiftStart = moment('2024-01-30 08:00:00').utc();
      const shiftEnd = moment('2024-01-30 17:00:00').utc();
      const userStart = moment('2024-01-30 09:00:00').utc();
      const userEnd = moment('2024-01-30 15:30:00').utc();

      // Act
      const result = service.handleShift(shiftStart, shiftEnd, userStart, userEnd);

      // Assert
      expect(result.duration).toBeCloseTo(6.5);
    });

    it('should handle non-overnight shift with start time greater', () => {
      // Arrange
      const shiftStart = moment('2024-01-30T13:00:00').utc();
      const shiftEnd = moment('2024-01-30T17:00:00').utc();
      const userStart = moment('2024-01-30T16:00:00').utc();
      const userEnd = moment('2024-01-30T14:30:00').utc();

      // Act
      const result = service.handleShift(shiftStart, shiftEnd, userStart, userEnd);
      console.log('result', result);
      // Assert
      expect(result.duration).toBeCloseTo(22.5);
    });

    it('should handle overnight shift', () => {
      // Arrange
      const shiftStart = moment('2024-03-06T17:00:00.000Z').utc();
      const shiftEnd = moment('2024-03-07T00:00:00.000Z').utc();
      const userStart = moment('2024-03-06T16:58:00').utc();
      const userEnd = moment('2024-03-06T17:19:00').utc();

      // Act
      const result = service.handleShift(shiftStart, shiftEnd, userStart, userEnd);

      // Assert
      expect(result.duration).toBeCloseTo(0.35);
    });

    describe('areDatesCrossingMidnight', () => {
      it('should return true if dates are crossing midnight', () => {
        const date1 = moment('2024-01-30T22:41:46+0000').utc().set({ hour: 22, minute: 41, second: 46 });
        const date2 = moment('2024-01-31T02:41:46+0000').utc().set({ hour: 9, minute: 41, second: 46 });
        const result = service._areDatesCrossingMidnight(date1, date2);

        expect(result).toBe(true);
      });

      it('should return false if dates are not crossing midnight', () => {
        const date1 = moment('2022-01-30 08:00:00').utc();
        const date2 = moment('2022-01-30 17:00:00').utc();

        const result = service._areDatesCrossingMidnight(date1, date2);

        expect(result).toBe(false);
      });
    });

    describe('isTimeGreaterThan', () => {
      it('should return true if time1 is greater than time2', () => {
        const moment1 = moment('12:00:00', 'HH:mm:ss').utc();
        const moment2 = moment('09:00:00', 'HH:mm:ss').utc();
        const result = service._isTimeGreaterThan(moment1, moment2);

        expect(result).toBe(true);
      });

      it('should return false if time1 is not greater than time2', () => {
        const moment1 = moment('09:00:00', 'HH:mm:ss').utc();
        const moment2 = moment('12:00:00', 'HH:mm:ss').utc();

        const result = service._isTimeGreaterThan(moment1, moment2);

        expect(result).toBe(false);
      });
    });

    describe('combineDateAndTime', () => {
      it('should combine date and time correctly', () => {
        const momentDate = moment('2022-01-30');
        const momentTime = moment('12:30:00', 'HH:mm:ss');

        const result = service._combineDateAndTime(momentDate, momentTime);

        const expectedCombinedInstance = moment.utc('2022-01-30 12:30:00', 'YYYY-MM-DD HH:mm:ss');

        expect(result.isSame(expectedCombinedInstance)).toBe(true);
      });
    });
  });
});
