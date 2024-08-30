import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request, User, Device } from '../../database/entities/mysql';
import { UserService } from './user.service';
import { PlatformAccessStatus } from '../enums';
import { BadRequestException } from '@nestjs/common';

describe('ChatGroupService', () => {
  let userService: UserService;

  const userRepo = {
    findOne: jest.fn().mockResolvedValue({ id: 1, channelId: '1' }),
    findOneBy: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const requestRepo = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };
  const deviceRepo = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepo,
        },
        {
          provide: getRepositoryToken(Request),
          useValue: requestRepo,
        },
        {
          provide: getRepositoryToken(Device),
          useValue: deviceRepo,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('fetchById should return the user by id if found', async () => {
    const user = await userService.fetchById({ id: 1 });
    expect(user).toBeDefined();
  });

  it('findOneByEmail should return the user by email if found', async () => {
    jest.spyOn(userRepo, 'findOne').mockResolvedValue({ id: 1, email: 'test@gravywork.com' });
    const user = await userService.findOneByEmail('test@gravywork.com');
    expect(user).toBeDefined();
  });

  it('User should be created using create method', async () => {
    jest.spyOn(userRepo, 'create').mockResolvedValue({ id: 1, email: 'test@gravywork.com' });
    const user = await userService.create({ email: 'test@gravywork.com', password: '123' });
    expect(user).toBeDefined();
  });

  it('User should be deleted using delete method', async () => {
    const user = await userService.delete(1);
    expect(user).toBeUndefined();
  });

  describe('upsertRequest method', () => {
    it('should throw BadRequestException if access is already requested', async () => {
      const email = 'test@gravywork.com';
      const user: Partial<User> = { email, allowedPlatform: PlatformAccessStatus.APP_REQUESTED };
      userRepo.findOneBy.mockResolvedValue(user);

      try {
        await userService.upsertRequest(email);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error['response']?.message).toBe('auth.USER_ACCESS_ALREADY_REQUESTED');
      }
    });

    it('should throw BadRequestException if access is already granted', async () => {
      const email = 'test@gravywork.com';
      const user: Partial<User> = { email, allowedPlatform: PlatformAccessStatus.APP_APPROVED };
      userRepo.findOneBy.mockResolvedValue(user);

      try {
        await userService.upsertRequest(email);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error['response']?.message).toBe('auth.USER_ACCESS_ALREADY_GRANTED');
      }
    });

    it('should update user and call upsertRequestTable when access is not requested or granted', async () => {
      const email = 'test@gravywork.com';
      const user: Partial<User> = { email, allowedPlatform: 0 };

      userRepo.findOneBy.mockResolvedValue(user);
      userRepo.update.mockResolvedValue(true);
      requestRepo.save.mockResolvedValue({ id: 1, email });

      const result = await userService.upsertRequest(email);

      expect(userRepo.update).toHaveBeenCalledWith({ email }, { allowedPlatform: PlatformAccessStatus.APP_REQUESTED });
      expect(result.id).toEqual(1);
    });

    it('should update user and call upsertRequestTable if request data already exist when access is not requested or granted', async () => {
      const email = 'test@gravywork.com';
      const user: Partial<User> = { email, allowedPlatform: 0 };

      userRepo.findOneBy.mockResolvedValue(user);
      userRepo.update.mockResolvedValue(true);
      requestRepo.save.mockResolvedValue({ id: 1, email });

      requestRepo.findOneBy.mockResolvedValue({ id: 1, email });
      const result = await userService.upsertRequest(email);

      expect(userRepo.update).toHaveBeenCalledWith({ email }, { allowedPlatform: PlatformAccessStatus.APP_REQUESTED });
      expect(result.id).toEqual(1);
    });
  });

  describe('grantAccess method', () => {
    it('should update user with granted access and return the updated user', async () => {
      const email = 'test@gravywork.com';
      const user: Partial<User> = { email, allowedPlatform: PlatformAccessStatus.APP_REQUESTED };
      userRepo.update.mockResolvedValue(user);

      const result = await userService.grantAccess(email);

      expect(userRepo.update).toHaveBeenCalledWith({ email }, { allowedPlatform: PlatformAccessStatus.APP_APPROVED });
      expect(result).toEqual(user); // You can replace this with your actual expected result
    });

    it('should throw BadRequestException if access is already granted', async () => {
      const email = 'test@gravywork.com';
      const user: Partial<User> = { email, allowedPlatform: PlatformAccessStatus.APP_APPROVED };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(userService as any, 'validateUser').mockResolvedValue(user);

      try {
        await userService.grantAccess(email);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error['response']?.message).toBe('auth.USER_ACCESS_ALREADY_GRANTED');
      }
    });
  });

  describe('validateUser method', () => {
    it('should update user with revoked access and return the updated user', async () => {
      const email = 'test@gravywork.com';
      const user: Partial<User> = { email, allowedPlatform: PlatformAccessStatus.APP_APPROVED };
      userRepo.update.mockResolvedValue(user);

      const result = await userService.revokeAccess(email);

      expect(userRepo.update).toHaveBeenCalledWith({ email }, { allowedPlatform: 0 });
      expect(result).toEqual(user); // You can replace this with your actual expected result
    });

    it('should throw BadRequestException if access is not provided', async () => {
      const email = 'test@gravywork.com';
      const user: Partial<User> = { email, allowedPlatform: 0 };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(userService as any, 'validateUser').mockResolvedValue(user);

      try {
        await userService.revokeAccess(email);
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error['response']?.message).toBe('auth.USER_ACCESS_NOT_PROVIDED');
      }
    });
  });
});
