import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AccessTokenService } from '../security/access-token/access-token.service';
import { RefreshTokenService } from '../security/refresh-token/refresh-token.service';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const userServiceMock = {
    getUserByEmail: jest.fn(),
    getUserByEmailIncludingDeleted: jest.fn(),
    createUser: jest.fn(),
    restoreUser: jest.fn(),
  };

  const accessTokenServiceMock = {
    generateToken: jest.fn(),
  };

  const refreshTokenServiceMock = {
    generateSessionToken: jest.fn(),
    verifyToken: jest.fn(),
    refreshToken: jest.fn(),
    deleteRefreshToken: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: AccessTokenService, useValue: accessTokenServiceMock },
        { provide: RefreshTokenService, useValue: refreshTokenServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('logs in a valid user and returns both tokens', async () => {
    const dto = {
      email: 'john@example.com',
      password: 'password123',
      sessionId: 'session-1',
    };
    const user = { id: 1, email: dto.email, password: 'hashed-password' };

    userServiceMock.getUserByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    accessTokenServiceMock.generateToken.mockResolvedValue('access-token');
    refreshTokenServiceMock.generateSessionToken.mockResolvedValue('refresh-token');

    await expect(service.login(dto)).resolves.toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    expect(userServiceMock.getUserByEmail).toHaveBeenCalledWith(dto.email);
    expect(refreshTokenServiceMock.generateSessionToken).toHaveBeenCalledWith(
      user,
      dto.sessionId,
    );
  });

  it('throws when registering an active existing user', async () => {
    const dto = {
      login: 'john',
      email: 'john@example.com',
      password: 'password123',
      age: 30,
      description: 'dev',
      sessionId: 'session-1',
    };

    userServiceMock.getUserByEmailIncludingDeleted.mockResolvedValue({
      id: 1,
      email: dto.email,
      deletedAt: null,
    });

    await expect(service.registration(dto)).rejects.toBeInstanceOf(HttpException);
    expect(userServiceMock.createUser).not.toHaveBeenCalled();
    expect(userServiceMock.restoreUser).not.toHaveBeenCalled();
  });

  it('restores a soft-deleted user during registration', async () => {
    const dto = {
      login: 'john',
      email: 'john@example.com',
      password: 'password123',
      age: 30,
      description: 'dev',
      sessionId: 'session-1',
    };
    const restoredUser = {
      id: 1,
      email: dto.email,
      password: 'hashed-password',
      deletedAt: null,
    };

    userServiceMock.getUserByEmailIncludingDeleted.mockResolvedValue({
      id: 1,
      email: dto.email,
      deletedAt: new Date(),
    });
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    userServiceMock.restoreUser.mockResolvedValue(restoredUser);
    accessTokenServiceMock.generateToken.mockResolvedValue('access-token');
    refreshTokenServiceMock.generateSessionToken.mockResolvedValue('refresh-token');

    await expect(service.registration(dto)).resolves.toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    expect(userServiceMock.restoreUser).toHaveBeenCalledWith({
      ...dto,
      password: 'hashed-password',
    });
  });

  it('throws on refresh when token payload is invalid', async () => {
    refreshTokenServiceMock.verifyToken.mockResolvedValue(null);

    await expect(
      service.refresh({ refreshToken: 'bad-token', sessionId: 'session-1' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
