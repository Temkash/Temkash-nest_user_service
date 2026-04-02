import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccessTokenService } from '../security/access-token/access-token.service';

describe('UserController', () => {
  let controller: UserController;

  const userServiceMock = {
    getUserProfileByEmail: jest.fn(),
    getPaginatedUsers: jest.fn(),
    getMyProfile: jest.fn(),
    softDeleteMyProfile: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AccessTokenService, useValue: { verifyToken: jest.fn() } },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('delegates current user lookup to user service', async () => {
    const req = { user: { email: 'john@example.com' } };
    userServiceMock.getMyProfile.mockResolvedValue({
      login: 'john',
      age: 30,
      description: 'dev',
    });

    await expect(controller.findMe(req)).resolves.toEqual({
      login: 'john',
      age: 30,
      description: 'dev',
    });
    expect(userServiceMock.getMyProfile).toHaveBeenCalledWith('john@example.com');
  });
});
