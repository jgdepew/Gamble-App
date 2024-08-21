import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetController } from './bet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { Game } from 'src/game/entities/game.entity';
import { GameService } from 'src/game/game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, Game])],
  controllers: [BetController],
  providers: [BetService, GameService],
  exports: [BetService],
})
export class BetModule {}
