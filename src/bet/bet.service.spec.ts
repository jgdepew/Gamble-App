import { Test, TestingModule } from '@nestjs/testing';
import { BetService } from './bet.service';
import { Bet } from './entities/bet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BetService', () => {
  let service: BetService;
  const mockBet: Bet = new Bet();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BetService,
        {
          provide: getRepositoryToken(Bet),
          useValue: {
            save: jest.fn().mockResolvedValue(mockBet),
            find: jest.fn().mockResolvedValue([mockBet]),
          },
        },
      ],
    }).compile();

    service = module.get<BetService>(BetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
