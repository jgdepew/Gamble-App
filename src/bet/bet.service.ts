import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './entities/bet.entity';
import { Game } from 'src/game/entities/game.entity';
import { format_currency, get_dice_roll } from 'util/number_util';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(createBetDto: CreateBetDto) {
    const game = await this.gameRepository.findOneBy({
      id: createBetDto.game_id,
      active: true,
    });
    const number_bet_on = createBetDto.number_bet_on;

    // validation
    if (!createBetDto.amount_bet || !number_bet_on) {
      throw new BadRequestException('invalid bet');
    }
    if (!game) {
      throw new BadRequestException('game is not active');
    }
    if (game.balance < createBetDto.amount_bet) {
      throw new BadRequestException('not enough money in balance');
    }
    if (number_bet_on < 1 && number_bet_on > 6) {
      throw new NotFoundException('invalid bet');
    }

    // dice roll
    const dice_roll: number = get_dice_roll();
    const req: CreateBetDto = {
      amount_bet: Number(createBetDto.amount_bet),
      game_id: Number(createBetDto.game_id),
      number_bet_on: Number(createBetDto.number_bet_on),
      dice_roll,
    };
    const bet = await this.betRepository.save(req);

    if (createBetDto.number_bet_on == dice_roll) {
      game.balance = game.balance + format_currency(bet.amount_bet * 5);
    } else {
      const difference = game.balance - bet.amount_bet;
      game.balance = difference > 0 ? difference : 0;
    }

    return {
      bet: bet,
      game: await this.gameRepository.save(game),
    };
  }

  findAll() {
    return this.betRepository.find({
      relations: {
        game: true,
      },
    });
  }

  findOne(id: number) {
    return this.betRepository.findOneBy({ id });
  }

  async update(id: number, updateBetDto: UpdateBetDto) {
    const bet = await this.betRepository.findOneBy({ id });
    const game = bet.game;
    if (!bet) {
      throw new NotFoundException('bet not found');
    }

    bet.number_bet_on = updateBetDto.number_bet_on;
    bet.amount_bet = updateBetDto.amount_bet;

    if (bet.number_bet_on == bet.dice_roll) {
    } else {
      const difference = game.balance - bet.amount_bet;
      game.balance = difference > 0 ? difference : 0;
    }

    return this.betRepository.save(bet);
  }
}
