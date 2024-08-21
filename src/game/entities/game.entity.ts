import { Bet } from 'src/bet/entities/bet.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 1000 })
  balance: number;

  @OneToMany(() => Bet, (bet) => bet.game)
  bets: Bet[];
}
