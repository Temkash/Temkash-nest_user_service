import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenService } from './access-token.service';

describe('AccessTokenService', () => {
  let service: AccessTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessTokenService,
        { provide: JwtService, useValue: { sign: jest.fn(), verify: jest.fn() } },
      ],
    }).compile();

    service = module.get<AccessTokenService>(AccessTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
