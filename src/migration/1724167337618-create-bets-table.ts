import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBetsTable1724167337618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            create table bets(
                id bigserial primary key,
                game_id bigserial not null references games(id),
                dice_roll int not null,
                number_bet_on int not null,
                amount_bet float not null
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`drop table bets;`);
  }
}
