import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGameDto } from './dto/create-game.dto';

describe('GameService', () => {
  let service: GameService;
  const mockGame: Game = new Game();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of games', async () => {
      const games = await service.findAll();
      expect(games).toStrictEqual([mockGame]);
    });
  });

  describe('create', () => {
    it('should create a game', async () => {
      const createGameDto: CreateGameDto = { active: true, balance: 1000 };
      const game = await service.create(createGameDto);
      expect(game).toStrictEqual(mockGame);
    });
  });
});
