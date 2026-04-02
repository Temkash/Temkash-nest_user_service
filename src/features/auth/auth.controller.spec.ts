import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const authServiceMock = {
    login: jest.fn(),
    registration: jest.fn(),
    refresh: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('delegates login to auth service', async () => {
    const dto = { email: 'john@example.com', password: 'password123', sessionId: 'session-1' };
    authServiceMock.login.mockResolvedValue({ accessToken: 'a', refreshToken: 'r' });

    await expect(controller.login(dto)).resolves.toEqual({ accessToken: 'a', refreshToken: 'r' });
    expect(authServiceMock.login).toHaveBeenCalledWith(dto);
  });
});
