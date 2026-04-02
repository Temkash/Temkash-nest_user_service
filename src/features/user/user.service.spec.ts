import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserRepository } from './user-repository.interface';

describe('UserService', () => {
  let service: UserService;

  const userRepositoryMock = {
    createUser: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserByEmailIncludingDeleted: jest.fn(),
    restoreUser: jest.fn(),
    softDeleteUserByEmail: jest.fn(),
    paginate: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: IUserRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('returns a safe current user profile without password and email', async () => {
    userRepositoryMock.getUserByEmail.mockResolvedValue({
      id: 1,
      login: 'john',
      email: 'john@example.com',
      password: 'hashed-password',
      age: 30,
      description: 'dev',
    });

    await expect(service.getMyProfile('john@example.com')).resolves.toEqual({
      login: 'john',
      age: 30,
      description: 'dev',
    });
  });

  it('maps paginated users to safe response DTOs', async () => {
    userRepositoryMock.paginate.mockResolvedValue({
      items: [
        {
          id: 1,
          login: 'john',
          email: 'john@example.com',
          password: 'hashed-password',
          age: 30,
          description: 'dev',
        },
      ],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    });

    await expect(service.getPaginatedUsers({ page: 1, limit: 10 })).resolves.toEqual({
      items: [
        {
          login: 'john',
          age: 30,
          description: 'dev',
        },
      ],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    });
  });

  it('soft deletes current profile by email', async () => {
    userRepositoryMock.softDeleteUserByEmail.mockResolvedValue(undefined);

    await expect(service.softDeleteMyProfile('john@example.com')).resolves.toEqual({
      message: 'Пользователь успешно удален',
    });

    expect(userRepositoryMock.softDeleteUserByEmail).toHaveBeenCalledWith('john@example.com');
  });
});
