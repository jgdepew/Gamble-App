import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetService } from 'src/bet/bet.service';
import { Bet } from 'src/bet/entities/bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Bet])],
  controllers: [GameController],
  providers: [GameService, BetService],
  exports: [GameService],
})
export class GameModule {}
