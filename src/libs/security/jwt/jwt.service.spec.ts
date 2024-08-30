import { JwtService } from './jwt.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService as DefaultJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { JwtType } from './enums';

describe('JwtService', () => {
  let service: JwtService;
  let jwtServiceMock;
  let configServiceMock;

  beforeEach(async () => {
    jwtServiceMock = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    configServiceMock = {
      get: jest.fn().mockImplementation((key) => {
        if (key === 'JWT_REFRESH_SECRET') return 'mockRefreshSecret';
        if (key === 'JWT_ACCESS_SECRET') return 'mockAccessSecret';
        if (key === 'JWT_REFRESH_EXPIRES_IN') return '1d';

        return '';
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: DefaultJwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should generate JWT', () => {
    const payload = { actor: { id: 1, parent_id: '1', type: JwtType.AppLogin } };
    jwtServiceMock.sign.mockReturnValue('mockToken');

    const result = service.generateJwt(payload);

    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(jwtServiceMock.sign).toHaveBeenCalledTimes(2);
  });

  it('should refresh token', () => {
    const mockPayload = { actor: { id: 1, parent_id: '1', type: JwtType.AppLogin } };
    jwtServiceMock.verify.mockReturnValue(mockPayload);

    const result = service.refreshToken('validToken');

    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
  });

  it('should throw UnauthorizedException when refresh token is invalid', () => {
    jwtServiceMock.verify.mockImplementation(() => {
      throw new Error();
    });

    expect(() => service.refreshToken('invalidToken')).toThrow(UnauthorizedException);
  });

  it('should verify token', () => {
    const mockPayload = { actor: { id: 1, parent_id: '1', type: JwtType.AppLogin } };
    jwtServiceMock.verify.mockReturnValue(mockPayload);

    const result = service.verifyToken('validToken');

    expect(result).toEqual(mockPayload);
  });

  it('should return null when verify token fails', () => {
    jwtServiceMock.verify.mockImplementation(() => {
      throw new Error();
    });

    const result = service.verifyToken('invalidToken');

    expect(result).toBeNull();
  });
});
