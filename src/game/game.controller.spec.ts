import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GameController', () => {
  let controller: GameController;
  const mockGame: Game = new Game();
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useValue: {
            save: jest.fn().mockResolvedValue(mockGame),
            find: jest.fn().mockResolvedValue([mockGame]),
          },
        },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of games', async () => {
      const result = [{ id: 1, balance: 0, active: false }];
      jest.spyOn(gameService, 'findAll');
      expect(await controller.findAll()).toBe(result);
    });
  });
});
