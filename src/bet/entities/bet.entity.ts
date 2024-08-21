import { Game } from 'src/game/entities/game.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('bets')
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  game_id: number;

  @ManyToOne(() => Game, (game) => game.bets)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @Column()
  dice_roll: number;

  @Column()
  number_bet_on: number;

  @Column()
  amount_bet: number;
}
