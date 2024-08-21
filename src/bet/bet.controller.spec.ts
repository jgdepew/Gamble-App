import { Test, TestingModule } from '@nestjs/testing';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { Bet } from './entities/bet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BetController', () => {
  let controller: BetController;
  const mockBet: Bet = new Bet();
  let betService: BetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetController],
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

    controller = module.get<BetController>(BetController);
    betService = module.get<BetService>(BetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of bets', async () => {
      const result = [
        { id: 1, game_id: 1, dice_roll: 1, number_bet_on: 1, amount_bet: 1 },
      ];
      jest
        .spyOn(betService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAll()).toBe(result);
    });
  });
});
