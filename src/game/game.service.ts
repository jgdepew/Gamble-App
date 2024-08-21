import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { Bet } from 'src/bet/entities/bet.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const active_games = await this.gameRepository.findBy({ active: true });
    if (active_games.length > 0) {
      throw new UnauthorizedException('There is an active game in progress');
    }
    return this.gameRepository.save(createGameDto);
  }

  findAll() {
    return this.gameRepository.find();
  }

  findOne(active: boolean) {
    return this.gameRepository.findOneBy({ active });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const games = await this.gameRepository.find({
      relations: {
        bets: true,
      },
      where: {
        id,
      },
    });
    if (games.length == 0) {
      throw new NotFoundException('game not found');
    }
    const game = games[0];
    let has_win = false;
    game.bets.forEach((bet) => {
      if (bet.dice_roll == bet.number_bet_on) {
        has_win = true;
      }
    });
    // game needs to have a winning bet in order to deactivate, aka widthraw
    game.active = has_win || game.balance == 0 ? updateGameDto.active : true;
    game.balance = updateGameDto.balance;
    return this.gameRepository.save(game);
  }
}
