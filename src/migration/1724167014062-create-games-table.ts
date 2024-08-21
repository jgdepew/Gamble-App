import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGamesTable1724167014062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            create table games (
                id bigserial primary key,
                balance float not null default 1000,
                active boolean not null default true
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`drop table games;`);
  }
}
